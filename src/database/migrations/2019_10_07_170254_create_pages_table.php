<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notepad_pages', function (Blueprint $table) {
            $table->string('id', 36);
            $table->string('notepad_id', 36);
            $table->string('title', 64);
            $table->mediumText('lines_order');

            $table->primary('id');
            $table->foreign('notepad_id')->references('id')->on('notepads');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notepad_pages');
    }
}
