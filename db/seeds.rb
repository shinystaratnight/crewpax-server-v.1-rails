# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
production_manager = Category.create(name: "Production Manager (PM)")
unit_production_manager = Category.create(name: "Unit Production Manager (UPM)")
key_pa = Category.create(name: "Key PA")
office_production_assistant = Category.create(name: "Office Production Assistant (OPA)")
location_manager = Category.create(name: "Location Manager (LM)")
assistant_location_manager = Category.create(name: "Assistant Location Manager (ALM)")
trainee_assistant_location_manager = Category.create(name: "Trainee Assistant Location Manager (TAL)")
first_assistant_director = Category.create(name: "1st Assistant Director (1st AD)")
second_assistant_director = Category.create(name: "2nd Assistant Director (2nd AD)")
third_assistant_director = Category.create(name: "3rd Assistant Director (3rd AD)")
trainee_assistant_director = Category.create(name: "Trainee Assistant Director (TAD)")
background_coordinator = Category.create(name: "Background Coordinator (AADBKC)")
director = Category.create(name: "Director")
producer = Category.create(name: "Producer")
director_assistant = Category.create(name: "Director’s Assistant")
producer_assistant = Category.create(name: "Producer’s Assistant")
art_production_design = Category.create(name: "Art / Production Design")
construction = Category.create(name: "Construction")
costumes = Category.create(name: "Costumes")
editors = Category.create(name: "Editors")
first_aid = Category.create(name: "First Aid / Craft Services (FACS)")
greens = Category.create(name: "Greens")
grips = Category.create(name: "Grips")
lighting = Category.create(name: "Lighting / Electrics (LX)")
hair = Category.create(name: "Hair")
make_up = Category.create(name: "Make Up")
paint = Category.create(name: "Paint")
production_coordinators = Category.create(name: "Production Coordinators")
properties= Category.create(name: "Properties (Props)")
script_supervisors = Category.create(name: "Script Supervisors")
set_dec = Category.create(name: "Set Dec")
sound = Category.create(name: "Sound")
special_effects = Category.create(name: "Special Effects (SPFX)")
transport = Category.create(name: "Transport")
visual_effects = Category.create(name: "Visual Effects")