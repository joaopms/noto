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
            $table->string('id', 32);
            $table->string('notepad_id', 32)->nullable();
            $table->unsignedBigInteger('user_id');
            $table->string('title', 64);
            $table->mediumText('line_order')->default('[]');

            $table->primary('id');
            $table->foreign('notepad_id')->references('id')->on('notepads');
            $table->foreign('user_id')->references('id')->on('users');
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
