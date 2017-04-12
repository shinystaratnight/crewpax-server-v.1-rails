# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# production_manager = Role.create(name: "Production Manager (PM)")
# unit_production_manager = Role.create(name: "Unit Production Manager (UPM)")
# key_pa = Role.create(name: "Key PA")
# office_production_assistant = Role.create(name: "Office Production Assistant (OPA)")
# location_manager = Role.create(name: "Location Manager (LM)")
# assistant_location_manager = Role.create(name: "Assistant Location Manager (ALM)")
# trainee_assistant_location_manager = Role.create(name: "Trainee Assistant Location Manager (TAL)")
# first_assistant_director = Role.create(name: "1st Assistant Director (1st AD)")
# second_assistant_director = Role.create(name: "2nd Assistant Director (2nd AD)")
# third_assistant_director = Role.create(name: "3rd Assistant Director (3rd AD)")
# trainee_assistant_director = Role.create(name: "Trainee Assistant Director (TAD)")
# background_coordinator = Role.create(name: "Background Coordinator (AADBKC)")
# director = Role.create(name: "Director")
# producer = Role.create(name: "Producer")
# director_assistant = Role.create(name: "Director’s Assistant")
# producer_assistant = Role.create(name: "Producer’s Assistant")
# art_production_design = Role.create(name: "Art / Production Design")
# construction = Role.create(name: "Construction")
# costumes = Role.create(name: "Costumes")
# editors = Role.create(name: "Editors")
# first_aid = Role.create(name: "First Aid / Craft Services (FACS)")
# greens = Role.create(name: "Greens")
# grips = Role.create(name: "Grips")
# lighting = Role.create(name: "Lighting / Electrics (LX)")
# hair = Role.create(name: "Hair")
# make_up = Role.create(name: "Make Up")
# paint = Role.create(name: "Paint")
# production_coordinators = Role.create(name: "Production Coordinators")
# properties= Role.create(name: "Properties (Props)")
# script_supervisors = Role.create(name: "Script Supervisors")
# set_dec = Role.create(name: "Set Dec")
# sound = Role.create(name: "Sound")
# special_effects = Role.create(name: "Special Effects (SPFX)")
# transport = Role.create(name: "Transport")
# visual_effects = Role.create(name: "Visual Effects")
# location_scout = Role.create(name: "Location Scout")
# stills_photographer = Role.create(name:"Stills Photographer")

# #comment out previous data to avoid duplication

# casting_director = Role.create(name: "Casting Director")
# background_casting = Role.create(name: "Background Casting")
# accountant = Role.create(name: "Accountant")
# properties_master = Role.create(name: "Properties Master")
# visual_FX_animators = Role.create(name: "Visual FX Animators")
# visual_FX_compositors = Role.create(name: "Visual FX Compositors")
# visual_FX_artists = Role.create(name: "Visual FX Artists")

# dgc = Union.create(name: "DGC")
# iatse_891 = Union.create(name: "IATSE 891")
# iatse_669 = Union.create(name: "IATSE 669")
# acfc= Union.create(name: "ACFC")
# teamsters = Union.create(name: "TEAMSTERS")
# none= Union.create(name: "None")


# on_set_key= Role.create(name: "On Set Key")
# catering= Role.create(name: "Catering")
# actor= Role.create(name:"Actor")
# stand_in= Role.create(name:"Stand In")
# extra= Role.create(name:"Extra")
# security= Role.create(name:"Security")
# animals= Role.create(name:"Animals")
# wranglers = Role.create(name:"Wranglers")
# scenic_art = Role.create(name:"Scenic Art")
# publicity= Role.create(name: "Publicity")
# prop_buidling = Role.create(name: "Prop Building")
# office= Role.create(name:"Office")
# production = Role.create(name: "Production")

# whmis=Certificate.create(name: "WHMIS")
# tcp=Certificate.create(name: "TCP")
# tdg=Certificate.create(name: "TDG")
# forklift_ticket=Certificate.create(name: "FORKLIFT TICKET")
# aerial_lift = Certificate.create(name:"AERIAL LIFT")
# scissor_lift= Certificate.create(name:"SCISSOR LIFT")
# pal_gun_license= Certificate.create(name:"PAL GUN LICENSE")
# act_safe= Certificate.create(name: "ACT SAFE")
# electricians_ticket = Certificate.create(name:"ELECTRICIAN TICKET")
# life_ticket= Certificate.create(name: "LIFT TICKET")
# se_de_exam= Certificate.create(name:"SE DE EXAM")
# boom_lift_ticket= Certificate.create(name:"BOOM LIFT TICKET")
# food_safe= Certificate.create(name:"FOODSAFE")
# drivers_license_class_one= Certificate.create(name:"DRIVERS LICENSE CLASS 1")
# drivers_license_class_two= Certificate.create(name:"DRIVERS LICENSE CLASS 2")
# drivers_license_class_three= Certificate.create(name:"DRIVERS LICENSE CLASS 3")

dgc = Union.create(name: "DGC") # union_id: 1
# iatse_891 = Union.create(name: "IATSE 891")
# iatse_669 = Union.create(name: "IATSE 669")
iatse = Union.create(name: "IATSE") # union_id: 2
acfc = Union.create(name: "ACFC") # union_id: 3
teamsters = Union.create(name: "TEAMSTERS") # union_id: 4
ubcp = Union.create(name: "UBCP/ACTRA") # union_id: 5
# actra = Union.create(name: "ACTRA") # union_id *was* 6
none = Union.create(name: "None") # union_id: 6

# all roles now (also) fall under "None"

# dgc, none
production_manager = dgc.roles.create(name: "Production Manager (PM)")
production_manager.eligibilities.create(union_id: 6)
key_pa = dgc.roles.create(name: "Key PA")
key_pa.eligibilities.create(union_id: 6)
opa = dgc.roles.create(name: "Office Production Assistant (OPA)")
opa.eligibilities.create(union_id: 6)
lm = dgc.roles.create(name: "Location Manager (LM)")
lm.eligibilities.create(union_id: 6)
alm = dgc.roles.create(name: "Assistant Location Manager (ALM)")
alm.eligibilities.create(union_id: 6)
tal = dgc.roles.create(name: "Trainee Assistant Location Manager (TAL)")
tal.eligibilities.create(union_id: 6)
ad1 = dgc.roles.create(name: "1st Assistant Director (1st AD)")
ad1.eligibilities.create(union_id: 6)
ad2 = dgc.roles.create(name: "2nd Assistant Director (2nd AD)")
ad2.eligibilities.create(union_id: 6)
ad3 = dgc.roles.create(name: "3rd Assistant Director (3rd AD)")
ad3.eligibilities.create(union_id: 6)
tad = dgc.roles.create(name: "Trainee Assistant Director (TAD)")
tad.eligibilities.create(union_id: 6)
bg_wrangler = dgc.roles.create(name: "BG Wrangler")
bg_wrangler.eligibilities.create(union_id: 6)
pa = dgc.roles.create(name: "Producer’s Assistant")
pa.eligibilities.create(union_id: 6)
location_scout = dgc.roles.create(name: "Location Scout")
location_scout.eligibilities.create(union_id: 6)
os_key = dgc.roles.create(name: "On Set Key")
os_key.eligibilities.create(union_id: 6)
os_pa = dgc.roles.create(name: "On Set PA")
os_pa.eligibilities.create(union_id: 6)

# dgc, acfc, teamsters and none
transport = dgc.roles.create(name: "Transport")
transport.eligibilities.create(union_id: 3)
transport.eligibilities.create(union_id: 4)
transport.eligibilities.create(union_id: 6)

# iatse, none
vfx = iatse.roles.create(name: "Visual Effects")
vfx.eligibilities.create(union_id: 6)
paint = iatse.roles.create(name: "Paint")
paint.eligibilities.create(union_id: 6)

# iatse, acfc and none
apd = iatse.roles.create(name: "Art / Production Design")
apd.eligibilities.create(union_id: 3)
apd.eligibilities.create(union_id: 6)
con = iatse.roles.create(name: "Construction")
con.eligibilities.create(union_id: 3)
con.eligibilities.create(union_id: 6)
cost = iatse.roles.create(name: "Costumes")
cost.eligibilities.create(union_id: 3)
cost.eligibilities.create(union_id: 6)
edit = iatse.roles.create(name: "Editors")
edit.eligibilities.create(union_id: 3)
edit.eligibilities.create(union_id: 6)
facs = iatse.roles.create(name: "First Aid / Craft Services (FACS)")
facs.eligibilities.create(union_id: 3)
facs.eligibilities.create(union_id: 6)
greens = iatse.roles.create(name: "Greens")
greens.eligibilities.create(union_id: 3)
greens.eligibilities.create(union_id: 6)
grips = iatse.roles.create(name: "Grips")
grips.eligibilities.create(union_id: 3)
grips.eligibilities.create(union_id: 6)
lx = iatse.roles.create(name: "Lighting / Electrics (LX)")
lx.eligibilities.create(union_id: 3)
lx.eligibilities.create(union_id: 6)
hair = iatse.roles.create(name: "Hair")
hair.eligibilities.create(union_id: 3)
hair.eligibilities.create(union_id: 6)
make = iatse.roles.create(name: "Make Up")
make.eligibilities.create(union_id: 3)
make.eligibilities.create(union_id: 6)
accountant = iatse.roles.create(name: "Accountant")
accountant.eligibilities.create(union_id: 3)
accountant.eligibilities.create(union_id: 6)
props = iatse.roles.create(name: "Properties (Props)")
props.eligibilities.create(union_id: 3)
props.eligibilities.create(union_id: 6)
script_sup = iatse.roles.create(name: "Script Supervisors")
script_sup.eligibilities.create(union_id: 3)
script_sup.eligibilities.create(union_id: 6)
set_dec = iatse.roles.create(name: "Set Dec")
set_dec.eligibilities.create(union_id: 3)
set_dec.eligibilities.create(union_id: 6)
sound = iatse.roles.create(name: "Sound")
sound.eligibilities.create(union_id: 3)
sound.eligibilities.create(union_id: 6)
spfx = iatse.roles.create(name: "Special Effects (SPFX)")
spfx.eligibilities.create(union_id: 3)
spfx.eligibilities.create(union_id: 6)
office = iatse.roles.create(name:"Office")
office.eligibilities.create(union_id: 3)
office.eligibilities.create(union_id: 6)
production = iatse.roles.create(name: "Production")
production.eligibilities.create(union_id: 3)
production.eligibilities.create(union_id: 6)

# acfc, none
catering = acfc.roles.create(name: "Catering")
catering.eligibilities.create(union_id: 6)
animals = acfc.roles.create(name: "Animals")
animals.eligibilities.create(union_id: 6)
wranglers = acfc.roles.create(name: "Wranglers")
wranglers.eligibilities.create(union_id: 6)
scenic_art = acfc.roles.create(name: "Scenic Art")
scenic_art.eligibilities.create(union_id: 6)
publicity = acfc.roles.create(name: "Publicity")
publicity.eligibilities.create(union_id: 6)
prop_building = acfc.roles.create(name: "Prop Building")
prop_building.eligibilities.create(union_id: 6)

# acfc, teamsters, none
security = acfc.roles.create(name: "Security")
security.eligibilities.create(union_id: 4)
security.eligibilities.create(union_id: 6)

# teamsters, none
captain = teamsters.roles.create(name: "Captain")
captain.eligibilities.create(union_id: 6)
co_captain = teamsters.roles.create(name: "Co-Captain")
co_captain.eligibilities.create(union_id: 6)
driver = teamsters.roles.create(name: "Driver")
driver.eligibilities.create(union_id: 6)
picture_car = teamsters.roles.create(name: "Picture Car")
picture_car.eligibilities.create(union_id: 6)

# ubcp-actra, none
actor = ubcp.roles.create(name: "Actor")
actor.eligibilities.create(union_id: 6)
stand_in = ubcp.roles.create(name: "Stand In")
stand_in.eligibilities.create(union_id: 6)
extra = ubcp.roles.create(name: "Extra")
extra.eligibilities.create(union_id: 6)

# no union
unit_production_manager = none.roles.create(name: "Unit Production Manager (UPM)")
background_coordinator = none.roles.create(name: "Background Coordinator (AADBKC)")
director = none.roles.create(name: "Director")
producer = none.roles.create(name: "Producer")
director_assistant = none.roles.create(name: "Director’s Assistant")
stills_photographer = none.roles.create(name:"Stills Photographer")
casting_director = none.roles.create(name: "Casting Director")
background_casting = none.roles.create(name: "Background Casting")
properties_master = none.roles.create(name: "Properties Master")
visual_FX_animators = none.roles.create(name: "Visual FX Animators")
visual_FX_compositors = none.roles.create(name: "Visual FX Compositors")
visual_FX_artists = none.roles.create(name: "Visual FX Artists")
production_coordinators = none.roles.create(name: "Production Coordinators")


Certificate.create(name: "WHMIS")
Certificate.create(name: "TCP")
Certificate.create(name: "TDG")
Certificate.create(name: "FORKLIFT TICKET")
Certificate.create(name: "AERIAL LIFT")
Certificate.create(name: "SCISSOR LIFT")
Certificate.create(name: "PAL GUN LICENSE")
Certificate.create(name: "ACT SAFE")
Certificate.create(name: "ELECTRICIAN TICKET")
Certificate.create(name: "LIFT TICKET")
Certificate.create(name: "SE DE EXAM")
Certificate.create(name: "BOOM LIFT TICKET")
Certificate.create(name: "FOODSAFE")
Certificate.create(name: "DRIVERS LICENSE CLASS 1")
Certificate.create(name: "DRIVERS LICENSE CLASS 2")
Certificate.create(name: "DRIVERS LICENSE CLASS 3")

User.create(name: "ashley", email: "ashley@gmail.com", password: "1234", admin: true)
User.create(name: "bashley", email: "bashley@gmail.com", password: "1234")
User.create(name: "smashley", email: "smashley@gmail.com", password: "1234")
User.create(name: "panacheley", email: "panacheley@gmail.com", password: "1234")

# 200.times do |i|
#   User.create(email: "new##{i+100}@sample.net", name: "##{i+35}shley", admin: false)
# end

