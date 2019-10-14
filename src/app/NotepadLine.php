<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NotepadLine extends Model
{
    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'string';

    protected $casts = [
        'block_order' => 'array',
    ];

    public function addBlock($block_id, $previous_block_id = null, $before_block = false)
    {
        $block_order = $this->block_order;

        // Add the block before/after another block or add the block to the start/end of the array
        if (!is_null($previous_block_id)) {
            $previous_block_index = array_search($previous_block_id, $block_order);
            if ($before_block) {
                array_splice($block_order, $previous_block_index, 0, $block_id);
            } else {
                array_splice($block_order, $previous_block_index + 1, 0, $block_id);
            }
        } else {
            if ($before_block) {
                array_unshift($block_order, $block_id);
            } else {
                array_push($block_order, $block_id);
            }
        }

        $this->block_order = $block_order;
    }

    public function removeBlock($block_id)
    {
        $block_order = $this->block_order;
        $block_index = array_search($block_id, $block_order);
        array_splice($block_order, $block_index, 1);
        $this->block_order = $block_order;
    }

    public function blocks()
    {
        return $this->hasMany('App\NotepadBlock', 'line_id');
    }
}
