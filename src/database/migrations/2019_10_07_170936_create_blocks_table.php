<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notepad_blocks', function (Blueprint $table) {
            $table->string('id', 36);
            $table->string('line_id', 36)->nullable();
            $table->string('type', 32);
            $table->text('content')->nullable();

            $table->primary('id');
            $table->foreign('line_id')->references('id')->on('notepad_lines');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notepad_blocks');
    }
}
