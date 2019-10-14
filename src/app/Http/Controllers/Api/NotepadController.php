<?php

namespace App\Http\Controllers\Api;

use App\Notepad;
use App\NotepadLine;
use App\NotepadPage;
use App\NotepadBlock;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\GetPagesRequest;
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
                case 'ADD_BLOCK': {
                        $block = new NotepadBlock;
                        $block->id = $action["id"];
                        $block->user_id = Auth::user()->id;
                        $block->type = $action["blockType"];
                        // FIXME
                        $block->save();

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
        $notepad = Notepad::findOrFail($request->notepad_id);
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
        $page = NotepadPage::findOrFail($request->page_id);
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
}
