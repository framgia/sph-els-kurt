<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Word;
use Database\Factories\CategoryFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::factory()
            ->hasWords(4)
            ->count(5)
            ->create();
    }
}
