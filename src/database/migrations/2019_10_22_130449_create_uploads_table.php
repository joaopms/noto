<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Symfony\Component\Mime\MimeTypes;

class CreateUploadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('uploads', function (Blueprint $table) {
            $table->string('id', 32);
            $table->string('notepad_id', 32);
            $table->string('page_id', 32);
            $table->unsignedBigInteger('user_id');
            $table->string('title', 64)->nullable();
            $table->enum('type', ['PDF', 'PDF Page', 'Image']);
            $table->enum('mimetype', ['application/pdf', 'image/jpg', 'image/png']);
            $table->timestamp('created_at')->useCurrent();

            $table->primary('id');
            $table->foreign('notepad_id')->references('id')->on('notepads');
            $table->foreign('page_id')->references('id')->on('notepad_pages');
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
        Schema::dropIfExists('uploads');
    }
}
