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
            $table->string('id', 32);
            $table->string('page_id', 32)->nullable();
            $table->mediumText('block_order')->default('[]');

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
