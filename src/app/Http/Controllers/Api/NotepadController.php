<?php

namespace App\Http\Controllers\Api;

use App\Notepad;
use App\PDFPage;
use App\FileUpload;
use App\NotepadLine;
use App\NotepadPage;
use App\NotepadBlock;
use ImalH\PDFLib\PDFLib;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\GetPagesRequest;
use App\Http\Requests\FileUploadRequest;
use App\Http\Requests\GetPageContentRequest;

class NotepadController extends Controller
{
    /**
     * Syncs the notepad data with the server
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function sync(Request $request)
    {
        foreach ($request->all() as $action) {
            // TODO Transaction
            // TODO Authentication
            switch ($action["type"]) {
                case 'ADD_NOTEPAD': {
                        $notepad = new Notepad;
                        $notepad->id = $action["id"];
                        $notepad->title = $action["title"];
                        $notepad->user_id = Auth::user()->id;
                        // FIXME
                        $notepad->save();

                        break;
                    }
                case 'ADD_PAGE': {
                        $page = new NotepadPage;
                        $page->id = $action["id"];
                        $page->user_id = Auth::user()->id;
                        $page->title = $action["title"];
                        // FIXME
                        $page->save();

                        break;
                    }
                case 'ADD_PAGE_TO_NOTEPAD': {
                        $page = NotepadPage::findOrFail($action["pageId"]);
                        $page->notepad_id = $action["notepadId"];
                        // FIXME
                        $page->save();

                        $notepad = Notepad::findOrFail($action["notepadId"]);
                        // TODO Do this properly at the model level (handle as array)
                        $page_order = $notepad->page_order;
                        array_push($page_order, $action["pageId"]);
                        $notepad->page_order = $page_order;
                        // FIXME
                        $notepad->save();

                        break;
                    }
                case 'ADD_LINE': {
                        $line = new NotepadLine;
                        $line->id = $action["id"];
                        $line->user_id = Auth::user()->id;
                        // FIXME
                        $line->save();

                        break;
                    }
                case 'REMOVE_LINE': {
                        $line = NotepadLine::findOrFail($action["id"]);
                        // FIXME
                        $line->delete();

                        break;
                    }
                case 'ADD_LINE_TO_PAGE': {
                        $line = NotepadLine::findOrFail($action["lineId"]);
                        $line->page_id = $action["pageId"];
                        // FIXME
                        $line->save();

                        $page = NotepadPage::findOrFail($action["pageId"]);
                        // TODO Do this properly at the model level (handle as array)
                        $line_order = $page->line_order;
                        array_push($line_order, $action["lineId"]);
                        $page->line_order = $line_order;
                        // FIXME
                        $page->save();

                        break;
                    }
                case 'REMOVE_LINE_FROM_PAGE': {
                        $line = NotepadLine::findOrFail($action["lineId"]);
                        $line->page_id = null;
                        $line->save();

                        $page = NotepadPage::findOrFail($action["pageId"]);
                        // TODO Do this properly at the model level (handle as array)
                        $line_order = $page->line_order;
                        $line_index = array_search($action["lineId"], $line_order);
                        array_splice($line_order, $line_index, 1);
                        $page->line_order = $line_order;
                        // FIXME
                        $page->save();

                        break;
                    }
                case 'ADD_BLOCK': {
                        $block = new NotepadBlock;
                        $block->id = $action["id"];
                        $block->user_id = Auth::user()->id;
                        $block->type = $action["blockType"];
                        // FIXME
                        $block->save();

                        break;
                    }
                case 'REMOVE_BLOCK': {
                        $block = NotepadBlock::findOrFail($action["blockId"]);
                        // FIXME
                        $block->delete();

                        break;
                    }
                case 'ADD_BLOCK_TO_LINE': {
                        $block = NotepadBlock::findOrFail($action["blockId"]);
                        $block->line_id = $action["lineId"];
                        // FIXME
                        $block->save();

                        $line = NotepadLine::findOrFail($action["lineId"]);
                        $line->addBlock($action["blockId"], $action["previousBlockId"], $action["beforeBlock"]);
                        // FIXME
                        $line->save();

                        break;
                    }
                case 'REMOVE_BLOCK_FROM_LINE': {
                        $block = NotepadBlock::findOrFail($action["blockId"]);
                        $block->line_id = null;
                        // FIXME
                        $block->save();

                        $line = NotepadLine::findOrFail($action["lineId"]);
                        $line->removeBlock($action["blockId"]);
                        // FIXME
                        $line->save();

                        break;
                    }
                case 'SET_BLOCK_CONTENT': {
                        $block = NotepadBlock::findOrFail($action["id"]);
                        $block->content = $action["content"];
                        // FIXME
                        $block->save();

                        break;
                    }
                default: {
                        echo ("Unsupported action detected:");
                        var_dump($action);
                        break;
                    }
            }
        }
    }

    /**
     * Gets all the notepads of a user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getNotepads()
    {
        $user = Auth::user();
        $structuredNotepads = $user->notepads;

        $notepads = [];
        $notepadIds = [];

        // Turn structured data into client-side's flat data
        foreach ($structuredNotepads as $notepad) {
            array_push($notepadIds, $notepad->id);
            $notepads[$notepad->id] = $notepad;

            // Rename the object property "page_order" to "pages"
            unset($notepad->pages);
            $notepad->pages = $notepad->page_order;
            unset($notepad->page_order);
        }

        return [
            'byId' => $notepads,
            'allIds' => $notepadIds
        ];
    }

    /**
     * Gets all the pages of a notepad
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getPages(GetPagesRequest $request)
    {
        $notepad = Notepad::find($request->notepad_id);

        // Return an empty response if the notepad doesn't exist
        // This way, we don't need to sync right after creating a new notepad to be able to add pages
        if (is_null($notepad)) {
            return [
                'byIds' => [],
                'allIds' => []
            ];
        }

        $structuredPages = $notepad->pages;

        $pages = [];
        $pageIds = [];

        // Turn structured data into client-side's flat data
        foreach ($structuredPages as $page) {
            array_push($pageIds, $page->id);
            $pages[$page->id] = $page;

            // Rename the object property "line_order" to "lines"
            unset($page->lines);
            $page->lines = $page->line_order;
            unset($page->line_order);
        }

        return [
            'byId' => $pages,
            'allIds' => $pageIds
        ];
    }

    /**
     * Gets all the content (lines and blocks) of a page
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getPageContent(GetPageContentRequest $request)
    {
        // TODO Optimize the queries
        $page = NotepadPage::find($request->page_id);

        // Return an empty response if the page doesn't exist
        // This way, we don't need to sync right after creating a new page to be able to add lines and blocks
        if (is_null($page)) {
            return [
                'lines' => [
                    'byIds' => [],
                    'allIds' => []
                ],
                'blocks' => [
                    'byIds' => [],
                    'allIds' => []
                ]
            ];
        }

        $structuredLines = $page->lines;

        $lines = [];
        $lineIds = [];

        $blocks = [];
        $blockIds = [];

        // Turn structured data into client-side's flat data
        foreach ($structuredLines as $line) {
            array_push($lineIds, $line->id);
            $lines[$line->id] = $line;

            foreach ($line->blocks as $block) {
                array_push($blockIds, $block->id);
                $blocks[$block->id] = $block;
            }

            // Rename the object property "block_order" to "blocks"
            unset($line->blocks);
            $line->blocks = $line->block_order;
            unset($line->block_order);
        }

        return [
            'lines' => [
                'byId' => $lines,
                'allIds' => $lineIds
            ],
            'blocks' => [
                'byId' => $blocks,
                'allIds' => $blockIds
            ]
        ];
    }

    public function uploadFiles(FileUploadRequest $request)
    {
        $notepad_id = $request->notepadId;
        $page_id = $request->pageId;
        $user_id = Auth::user()->id;

        foreach ($request->file('file') as $file_info) {
            $file_mime = $file_info->getMimeType();
            if ($file_mime == 'image/jpeg') {
                $file_mime = 'image/jpg';
            }

            $file_name_clean = htmlspecialchars(trim($file_info->getClientOriginalName()));
            $file_name = substr($file_name_clean, 0, 64);

            $isPdf = strpos($file_mime, 'pdf') !== false;
            $isImage = strpos($file_mime, 'image') !== false;

            // Save the file to the database
            $file = new FileUpload;
            $file->id = bin2hex(random_bytes(16)); // TODO Refactor
            $file->notepad_id = $notepad_id;
            $file->page_id = $page_id;
            $file->user_id = $user_id;
            $file->mimetype = $file_mime;
            $file->type = $isImage ? FileUpload::TYPE_IMAGE : ($isPdf ? FileUpload::TYPE_PDF : null);
            $file->title = $file_name;
            $file->save();

            // Store the file
            $file_info->storePubliclyAs('public/uploads', $file->file_name);

            // If the file is a PDF file, convert it to images and save them
            if ($isPdf) {
                // Create a temporary directory to store the converted pages
                $temp_dir = sys_get_temp_dir() . '/' . $file->id;
                mkdir($temp_dir);

                // Convert the PDF to images
                $converter = new PDFLib();
                $converter->setPdfPath($file->file_path);
                $converter->setOutputPath($temp_dir);
                $converter->setDPI(300);
                $converter->setImageFormat(PDFLib::$IMAGE_FORMAT_PNG);
                $converter->convert();

                // We start from 2 because the first two items correspond to the current and previous directory
                $temp_files = scandir($temp_dir);
                for ($i = 2; $i < sizeof($temp_files); $i++) {
                    // Save the page to the database
                    $page_image = new FileUpload;
                    $page_image->id = bin2hex(random_bytes(16)); // TODO Refactor
                    $page_image->notepad_id = $notepad_id;
                    $page_image->page_id = $page_id;
                    $page_image->user_id = $user_id;
                    $page_image->mimetype = FileUpload::MIMETYPE_PNG;
                    $page_image->type = FileUpload::TYPE_PDF_PAGE;
                    $page_image->save();

                    $pdf_page = new PDFPage;
                    $pdf_page->pdf_id = $file->id;
                    $pdf_page->image_id = $page_image->id;
                    $pdf_page->page_number = $i - 1;
                    $pdf_page->save();

                    // Move the files from the temporary directory and rename them
                    $temp_file_path = $temp_dir . '/' . $temp_files[$i];
                    rename($temp_file_path, $page_image->file_path);
                }

                // Remove the temporary directory
                rmdir($temp_dir);
            }
        }
    }
}
