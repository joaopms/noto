<?php

namespace App\Http\Controllers\Api;

use App\Notepad;
use App\NotepadLine;
use App\NotepadPage;
use App\NotepadBlock;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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
                        $notepad->page_order .= $action["pageId"] . ',';
                        // FIXME
                        $notepad->save();

                        break;
                    }
                case 'ADD_LINE': {
                        $line = new NotepadLine;
                        $line->id = $action["id"];
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
                        $page->line_order .= $action["lineId"] . ',';
                        // FIXME
                        $page->save();

                        break;
                    }
                case 'ADD_BLOCK': {
                        $block = new NotepadBlock;
                        $block->id = $action["id"];
                        $block->type = $action["blockType"];
                        // FIXME
                        $block->save();

                        break;
                    }
                case 'ADD_BLOCK_TO_LINE': {
                        // ["blockId"]=>
                        // string(36) "d7c9399e-3666-461e-ac8b-6714665813ce"
                        // ["previousBlockId"]=>
                        // NULL
                        // ["beforeBlock"]=>
                        // bool(false)
                        $block = NotepadBlock::findOrFail($action["blockId"]);
                        $block->line_id = $action["lineId"];
                        // FIXME
                        $block->save();

                        $line = NotepadLine::findOrFail($action["lineId"]);
                        // TODO Do this properly at the model level (handle as array)
                        // TODO Handle adding before and after a certain block
                        $line->block_order .= $action["blockId"] . ',';
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
                        // TODO Remove the block from the line
                        // $line->block_order .= $action["blockId"] . ',';
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
}
