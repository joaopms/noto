<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notepad_lines', function (Blueprint $table) {
            $table->string('id', 36);
            $table->string('page_id', 36);
            $table->mediumText('block_order');

            $table->primary('id');
            $table->foreign('page_id')->references('id')->on('notepad_pages');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notepad_lines');
    }
}
