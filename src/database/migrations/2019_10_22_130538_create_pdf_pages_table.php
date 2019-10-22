<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePdfPagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pdf_pages', function (Blueprint $table) {
            $table->string('pdf_id', 32);
            $table->string('image_id', 32);
            $table->unsignedInteger('page_number');

            $table->primary(['pdf_id', 'image_id']);
            $table->foreign('pdf_id')->references('id')->on('uploads');
            $table->foreign('image_id')->references('id')->on('uploads');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pdf_pages');
    }
}
