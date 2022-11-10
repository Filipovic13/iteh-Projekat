<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Registration;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Registration::truncate();
        Tournament::truncate();
        User::truncate();

        $user1 =User::factory()->create();
        $user2 =User::factory()->create();
        $user3 =User::factory()->create();

        $tournament1 = Tournament::create(
            ['event_name'=>'Old bridge Mostar open',
            'country'=>'Bosnia and Herzegovina',
            'city'=>'Mostar',
            'ruleset'=>'IBJJF',
            'date'=>'2022-09-10']);
        $tournament2 = Tournament::create(
            ['event_name'=>'8th Serbian Grappling cup',
            'country'=>'Serbia',
            'city'=>'Kula',
            'ruleset'=>'Grappling',
            'date'=>'2022-11-13']);
        $tournament3 = Tournament::create(
            ['event_name'=>'ADCC Slovak open',
            'country'=>'Slovakia',
            'city'=>'Banská Bystrica',
            'ruleset'=>'ADCC',
            'date'=>'2022-11-06']);


            $reg1 = Registration::create([
                'name'=>$user1->name,
                'surname'=>$user1->surname,
                'category'=>'lightweight',
                'belt'=>'blue',
                'event_name'=>'ADCC Slovak open',
                'user_id'=>$user1->id,
                'tournament_id'=>$tournament3->id
            ]);
            $reg2 = Registration::create([
                'name'=>$user1->name,
                'surname'=>$user1->surname,
                'category'=>'lightweight',
                'belt'=>'blue',
                'event_name'=>'ADCC Slovak open',
                'user_id'=>$user1->id,
                'tournament_id'=>$tournament3->id
            ]);
            $reg3 = Registration::create([
                'name'=>$user2->name,
                'surname'=>$user2->surname,
                'category'=>'heavyweight',
                'belt'=>'purple',
                'event_name'=>'8th Serbian Grappling cup',
                'user_id'=>$user2->id,
                'tournament_id'=>$tournament2->id
            ]);
            $reg4 = Registration::create([
                'name'=>$user3->name,
                'surname'=>$user3->surname,
                'category'=>'heavyweight',
                'belt'=>'black',
                'event_name'=>'Old bridge Mostar open',
                'user_id'=>$user3->id,
                'tournament_id'=>$tournament1->id
            ]);



    }
}
