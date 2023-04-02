<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Role::factory()->create(['name' => 'Administrator']);
        \App\Models\Role::factory()->create(['name' => 'User']);
        \App\Models\User::factory(10)->create();
        \App\Models\Permission::factory(10)->create();

        $roles = Role::all();

        foreach ($roles as $role) {
            $role->permissions()->attach(
                Permission::inRandomOrder()->take(rand(2,5))->pluck('id')
            );
        }
    }
}
