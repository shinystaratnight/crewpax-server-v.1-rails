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
acfc= Union.create(name: "ACFC") # union_id: 3
teamsters = Union.create(name: "TEAMSTERS") # union_id: 4
ubcp = Union.create(name: "UBCP") # union_id: 5
actra = Union.create(name: "ACTRA") # union_id: 6
none= Union.create(name: "None") # union_id: 7

production_manager = Role.create(name: "Production Manager (PM)")
unit_production_manager = Role.create(name: "Unit Production Manager (UPM)")
key_pa = dgc.roles.create(name: "Key PA") # also none
key_pa.eligibilities.create(union_id: 7)
opa = dgc.roles.create(name: "Office Production Assistant (OPA)")# also none
opa.eligibilities.create(union_id: 7)
lm = dgc.roles.create(name: "Location Manager (LM)") # also none
lm.eligibilities.create(union_id: 7)
alm = dgc.roles.create(name: "Assistant Location Manager (ALM)") # also none
alm.eligibilities.create(union_id: 7)
tal = dgc.roles.create(name: "Trainee Assistant Location Manager (TAL)") # also none
tal.eligibilities.create(union_id: 7)
ad1 = dgc.roles.create(name: "1st Assistant Director (1st AD)") # also none
ad1.eligibilities.create(union_id: 7)
ad2 = dgc.roles.create(name: "2nd Assistant Director (2nd AD)") # also none
ad2.eligibilities.create(union_id: 7)
ad3 = dgc.roles.create(name: "3rd Assistant Director (3rd AD)") # also none
ad3.eligibilities.create(union_id: 7)
tad = dgc.roles.create(name: "Trainee Assistant Director (TAD)") # also none
tad.eligibilities.create(union_id: 7)

background_coordinator = Role.create(name: "Background Coordinator (AADBKC)")
director = Role.create(name: "Director")
producer = Role.create(name: "Producer")
director_assistant = Role.create(name: "Director’s Assistant")
pa = dgc.roles.create(name: "Producer’s Assistant") # also none
pa.eligibilities.create(union_id: 7)

apd = iatse.roles.create(name: "Art / Production Design") # also acfc
apd.eligibilities.create(union_id: 3)
con = iatse.roles.create(name: "Construction") # also acfc
con.eligibilities.create(union_id: 3)
cost = iatse.roles.create(name: "Costumes") # also acfc
cost.eligibilities.create(union_id: 3)
edit = iatse.roles.create(name: "Editors") # also acfc
edit.eligibilities.create(union_id: 3)
facs = iatse.roles.create(name: "First Aid / Craft Services (FACS)") # also acfc
facs.eligibilities.create(union_id: 3)
greens = iatse.roles.create(name: "Greens") # also acfc
greens.eligibilities.create(union_id: 3)
grips = iatse.roles.create(name: "Grips") # also acfc
grips.eligibilities.create(union_id: 3)
lx = iatse.roles.create(name: "Lighting / Electrics (LX)") # also acfc
lx.eligibilities.create(union_id: 3)
hair = iatse.roles.create(name: "Hair") # also acfc
hair.eligibilities.create(union_id: 3)
make = iatse.roles.create(name: "Make Up") # also acfc
make.eligibilities.create(union_id: 3)
iatse.roles.create(name: "Paint")
production_coordinators = Role.create(name: "Production Coordinators")
props = iatse.roles.create(name: "Properties (Props)") # also acfc
props.eligibilities.create(union_id: 3)
script_sup = iatse.roles.create(name: "Script Supervisors") # also acfc
script_sup.eligibilities.create(union_id: 3)
set_dec = iatse.roles.create(name: "Set Dec") # also acfc
set_dec.eligibilities.create(union_id: 3)
sound = iatse.roles.create(name: "Sound") # also acfc
sound.eligibilities.create(union_id: 3)
spfx = iatse.roles.create(name: "Special Effects (SPFX)") # also acfc
spfx.eligibilities.create(union_id: 3)
transport = dgc.roles.create(name: "Transport") # also acfc also teamsters also none
transport.eligibilities.create(union_id: 3)
transport.eligibilities.create(union_id: 4)
transport.eligibilities.create(union_id: 7)
iatse.roles.create(name: "Visual Effects")
location_scout = Role.create(name: "Location Scout")
stills_photographer = Role.create(name:"Stills Photographer")

casting_director = Role.create(name: "Casting Director")
background_casting = Role.create(name: "Background Casting")
accountant = iatse.roles.create(name: "Accountant") #also acfc
accountant.eligibilities.create(union_id: 3)
properties_master = Role.create(name: "Properties Master")
visual_FX_animators = Role.create(name: "Visual FX Animators")
visual_FX_compositors = Role.create(name: "Visual FX Compositors")
visual_FX_artists = Role.create(name: "Visual FX Artists")

os_key = dgc.roles.create(name: "On Set Key") # also none
os_key.eligibilities.create(union_id: 7)
acfc.roles.create(name: "Catering")
actor = ubcp.roles.create(name: "Actor") # also actra
actor.eligibilities.create(union_id: 6)
stand_in = ubcp.roles.create(name: "Stand In") # also actra
stand_in.eligibilities.create(union_id: 6)
extra = ubcp.roles.create(name:" Extra") # also actra
extra.eligibilities.create(union_id: 6)
security = acfc.roles.create(name: "Security") # also teamsters
security.eligibilities.create(union_id: 4)
acfc.roles.create(name: "Animals")
acfc.roles.create(name: "Wranglers")
acfc.roles.create(name: "Scenic Art")
acfc.roles.create(name: "Publicity")
acfc.roles.create(name: "Prop Building")
office = iatse.roles.create(name:"Office") # also acfc
office.eligibilities.create(union_id: 3)
production = iatse.roles.create(name: "Production") # also acfc
production.eligibilities.create(union_id: 3)

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

# 200.times do |i|
#       User.create(email: "new##{i+35}@sample.net", name: "##{i+35}shley", admin: false)
# end

