<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Product;
use App\Models\Registration;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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
        Product::truncate();
        User::truncate();
    
        
        $admin = User::create([
            'email'=>'admin@email.com',
            'password'=>Hash::make('admin123'),
            'role'=>'admin',
            'email_verified_at'=> now(),
        ]);

        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();

        $user4= User::create([
            'name'=>'Filip',
            'surname'=>'Visnjic',            
            'email'=>'fica@email.com',                 
            'country'=>'Bosna and Hercegovina',            
            'city'=>'Donja Trnova',            
            'club'=>'Lutador',
            'email_verified_at'=> now(),
            'password'=>Hash::make('cofii123'),
        ]);
     
        

        $tournament1 = Tournament::create(
            [
                'event_name' => 'Old bridge Mostar open',
                'country' => 'Bosnia and Herzegovina',
                'city' => 'Mostar',
                'ruleset' => 'IBJJF',
                'date' => '2022-09-10',
                'image_url' => 'https://federalna.ba/storage/photos/31/BJJ%20Old%20Bridge%20Mostar.jpg'
            ]
        );
        $tournament2 = Tournament::create(
            [
                'event_name' => '8th Serbian Grappling cup',
                'country' => 'Serbia',
                'city' => 'Kula',
                'ruleset' => 'Grappling',
                'date' => '2022-11-13',
                'image_url' => 'http://www.crograppling.com/wp-content/uploads/2019/10/final-plakat-crveni-770x470.png'
            ]
        );
        $tournament3 = Tournament::create(
            [
                'event_name' => 'ADCC Slovak open',
                'country' => 'Slovakia',
                'city' => 'Banská Bystrica',
                'ruleset' => 'ADCC',
                'date' => '2022-11-06',
                'image_url' => 'https://smoothcomp.com/pictures/t/1658170-7ckx/adcc-slovak-open-2022.png'
            ]
        );


        $reg1 = Registration::create([
            'name' => $user1->name,
            'surname' => $user1->surname,
            'category' => 'lightweight',
            'belt' => 'blue',
            'event_name' => 'ADCC Slovak open',
            'tournament_id' => $tournament3->id
        ]);
        $reg2 = Registration::create([
            'name' => $user1->name,
            'surname' => $user1->surname,
            'category' => 'lightweight',
            'belt' => 'blue',
            'event_name' => 'ADCC Slovak open',
            'tournament_id' => $tournament3->id
        ]);
        $reg3 = Registration::create([
            'name' => $user2->name,
            'surname' => $user2->surname,
            'category' => 'heavyweight',
            'belt' => 'purple',
            'event_name' => '8th Serbian Grappling cup',
            'tournament_id' => $tournament2->id
        ]);
        $reg4 = Registration::create([
            'name' => $user3->name,
            'surname' => $user3->surname,
            'category' => 'heavyweight',
            'belt' => 'black',
            'event_name' => 'Old bridge Mostar open',
            'tournament_id' => $tournament1->id
        ]);




        $prod1 = Product::create([
            'name' => 'Navy venom kimono',
            'price'=>"12990",
            'category'=>"Kimono",
            'quantity'=>"200",
            'brand'=>"Venom",
            'image_url' => 'https://fightshop.rs/wp-content/uploads/2019/11/venum-03057-018-a0-venum-03057-018-a0-galery_image_1-bjj_gi_contender_2_0_blue_navy_1500_01.jpg',
            'description'=>"This is the second version of our Venum BJJ Contender Gi, more durable and comfortable than the previous model!
            The jacket is 100% Pearl Weave Cotton, perfectly combining strength and comfort. Along with reinforced seams!
            The collar is reinforced with EVA foam to help you resist grips and help counter the attacks of your opponents.
            The pants are 100% cotton and are reinforced inside of the leg and ankle cuffs.",

        ]);

        $prod2 = Product::create([
            'name' => 'Grey venom kimono',
            'price'=>"11990",
            'category'=>"Kimono",
            'quantity'=>"300",
            'brand'=>"Venom",
            'image_url' => 'https://fightshop.rs/wp-content/uploads/2020/03/venum-03057-010-a0-venum-03057-010-a0-galery_image_1-bjj_gi_contender_2_0_grey_1500_01.jpg',
            'description'=>"This is the second version of our Venum BJJ Contender Gi, more durable and comfortable than the previous model!
            The jacket is 100% Pearl Weave Cotton, perfectly combining strength and comfort. Along with reinforced seams!
            The collar is reinforced with EVA foam to help you resist grips and help counter the attacks of your opponents.
            The pants are 100% cotton and are reinforced inside of the leg and ankle cuffs.",
        ]);

        $prod3 = Product::create([
            'name' => 'Black venom kimono',
            'price'=>"10500",
            'category'=>"Kimono",
            'quantity'=>"150",
            'brand'=>"Venom",
            'image_url' => 'https://fightshop.rs/wp-content/uploads/2018/01/bjj_gi_contender_2_0_black_1500_01_1_4.jpg',
            'description'=>"This is the second version of our Venum BJJ Contender Gi, more durable and comfortable than the previous model!
            The jacket is 100% Pearl Weave Cotton, perfectly combining strength and comfort. Along with reinforced seams!
            The collar is reinforced with EVA foam to help you resist grips and help counter the attacks of your opponents.
            The pants are 100% cotton and are reinforced inside of the leg and ankle cuffs.",
 
        ]);






    }
}
