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

# iatse (sometimes none as well, see further down)
assistant_accountant = iatse.roles.create(name: "Assistant Accountant")
accounting_clerk_1 = iatse.roles.create(name: "Accounting Clerk 1")
accounting_clerk_2 = iatse.roles.create(name: "Accounting Clerk 2")
accounting_trainee = iatse.roles.create(name: "Accounting Trainee")
production_designer = iatse.roles.create(name: "Production Designer")
art_director = iatse.roles.create(name: "Art Director")
assistant_art_director = iatse.roles.create(name: "Assistant Art Director")
draftsperson = iatse.roles.create(name: "Draftsperson")
graphics = iatse.roles.create(name: "Graphics")
illustrator = iatse.roles.create(name: "Illustrator")
storyboard_artist = iatse.roles.create(name: "Storyboard Artist")
set_designer = iatse.roles.create(name: "Set Designer")
art_department_assistant = iatse.roles.create(name: "Art Department Assistant")
construction_coordinator = iatse.roles.create(name: "Construction Coordinator")
construction_foreman = iatse.roles.create(name: "Construction Foreman")
lead_carpenter = iatse.roles.create(name: "Lead Carpenter")
scenic_carpenter = iatse.roles.create(name: "Scenic Carpenter")
metal_fabricator = iatse.roles.create(name: "Metal Fabricator")
scenic_metal_fabricator = iatse.roles.create(name: "Scenic Metal Fabricator")
construction_buyer = iatse.roles.create(name: "Construction Buyer")
sculptor = iatse.roles.create(name: "Sculptor")
model_maker = iatse.roles.create(name: "Model Maker")
labourer_construction = iatse.roles.create(name: "Labourer (Construction)")
costume_designer = iatse.roles.create(name: "Costume Designer")
asst_costume_designer_coordinator = iatse.roles.create(name: "Asst. Costume Designer/Coordinator")
set_supervisor = iatse.roles.create(name: "Set Supervisor")
performers_costumer = iatse.roles.create(name: "Performer's Costumer")
set_costumer = iatse.roles.create(name: "Set Costumer")
props_master = iatse.roles.create(name: "Props Master")
assistant_props_master = iatse.roles.create(name: "Assistant Props Master")
props = iatse.roles.create(name: "Props")
props_buyer = iatse.roles.create(name: "Props Buyer")
production_office_coordinator = iatse.roles.create(name: "Production Office Coordinator")
assistant_production_office_coordinator = iatse.roles.create(name: "Assistant Production Office Coordinator")
assistant_office_coordinator_2 = iatse.roles.create(name: "2nd Assistant Office Coordinator")
supervising_editor = iatse.roles.create(name: "Supervising Editor")
supervising_sound_editor = iatse.roles.create(name: "Supervising Sound Editor")
editor = iatse.roles.create(name: "Editor")
sound_effects_editor = iatse.roles.create(name: "Sound Effects Editor")
music_editor = iatse.roles.create(name: "Music Editor")
assistant_editor = iatse.roles.create(name: "Assistant Editor")
sound_mixer = iatse.roles.create(name: "Sound Mixer")
sound_boom = iatse.roles.create(name: "Sound Boom")
sound_assist = iatse.roles.create(name: "Sound Assist")
set_dec_buyer = iatse.roles.create(name: "Set Dec Buyer")
set_dec_lead_dresser = iatse.roles.create(name: "Set Dec Lead Dresser")
set_dec_on_set = iatse.roles.create(name: "Set Dec On Set")
key_grip = iatse.roles.create(name: "Key Grip")
truck_grip = iatse.roles.create(name: "Truck Grip")
grip = iatse.roles.create(name: "Grip")
dolly_grip = iatse.roles.create(name: "Dolly Grip")
rigging_grip = iatse.roles.create(name: "Rigging Grip")
gaffer = iatse.roles.create(name: "Gaffer")
truck_lx = iatse.roles.create(name: "Truck LX")
lamp_op = iatse.roles.create(name: "Lamp Op")
rigging_lx = iatse.roles.create(name: "Rigging LX")
hair_department_head = iatse.roles.create(name: "Hair Department Head")
assistant_hairstylist = iatse.roles.create(name: "Assistant Hairstylist")
second_assistant_hairstylist = iatse.roles.create(name: "Second Assistant Hairstylist")
special_makeup_effects = iatse.roles.create(name: "Special Makeup Effects")
makeup_department_head = iatse.roles.create(name: "Makeup Department Head")
first_assistant_makeup_artist = iatse.roles.create(name: "First Assistant Makeup Artist")
second_assistant_makeup_artist = iatse.roles.create(name: "Second Assistant Makeup Artist")
third_assistant_makeup_artist = iatse.roles.create(name: "Third Assistant Makeup Artist")
first_aid = iatse.roles.create(name: "First Aid")
craft_service = iatse.roles.create(name: "Craft Service")
paint_coordinator = iatse.roles.create(name: "Paint Coordinator")
lead_painter = iatse.roles.create(name: "Lead Painter")
scenic_artist = iatse.roles.create(name: "Scenic Artist")
sign_painter_fabricator = iatse.roles.create(name: "Sign Painter/Fabricator")
scenic_painter = iatse.roles.create(name: "Scenic Painter")
plasterer = iatse.roles.create(name: "Plasterer")
set_painter = iatse.roles.create(name: "Set Painter")
paint_labourer = iatse.roles.create(name: "Paint Labourer")
script_supevisor_continuity = iatse.roles.create(name: "Script Supevisor/Continuity")
assistant_to_script_supervisor_continuity = iatse.roles.create(name: "Assistant to Script Supervisor/Continuity")
special_effects_coordinator = iatse.roles.create(name: "Special Effects Coordinator")
first_assistant_special_effects = iatse.roles.create(name: "First Assistant Special Effects")
special_effects_assistant = iatse.roles.create(name: "Special Effects Assistant")
special_effects_labourer = iatse.roles.create(name: "Special Effects Labourer")
vfx_artist_level_1 = iatse.roles.create(name: "VFX Artist ‐ Level 1")
vfx_artist_level_2 = iatse.roles.create(name: "VFX Artist ‐ Level 2")
vfx_artist_level_3 = iatse.roles.create(name: "VFX Artist ‐ Level 3")
vfx_technician_level_1 = iatse.roles.create(name: "VFX Technician ‐ Level 1")
vfx_technician_level_2 = iatse.roles.create(name: "VFX Technician ‐ Level 2")
director_of_photography = iatse.roles.create(name: "Director of Photography")
operator = iatse.roles.create(name: "Operator")
first_assistant_operator = iatse.roles.create(name: "1st Assistant Operator")
second_assistant_operator = iatse.roles.create(name: "2nd Assistant Operator")
film_loader = iatse.roles.create(name: "Film Loader")
trainee = iatse.roles.create(name: "Trainee")
# stills_photographer_i = iatse.roles.create(name: "Stills Photographer I") # redundant until further notice
motion_picture_video_coordinator = iatse.roles.create(name: "Motion Picture Video Coordinator")
motion_picture_video_assistant_1 = iatse.roles.create(name: "Motion Picture Video Assistant 1")
motion_picture_video_assistant_2 = iatse.roles.create(name: "Motion Picture Video Assistant 2")
digital_imaging_technician = iatse.roles.create(name: "Digital Imaging Technician")
vfx = iatse.roles.create(name: "Visual Effects")
paint = iatse.roles.create(name: "Paint")


# iatse, acfc ( no longer none )
apd = iatse.roles.create(name: "Art / Production Design")
apd.eligibilities.create(union_id: 3)
#apd.eligibilities.create(union_id: 6)
construction = iatse.roles.create(name: "Construction")
construction.eligibilities.create(union_id: 3)
#construction.eligibilities.create(union_id: 6)
cost = iatse.roles.create(name: "Costumes")
cost.eligibilities.create(union_id: 3)
#edit = iatse.roles.create(name: "Editors")
#edit.eligibilities.create(union_id: 3)
#edit.eligibilities.create(union_id: 6)
facs = iatse.roles.create(name: "First Aid / Craft Services (FACS)")
facs.eligibilities.create(union_id: 3)
#facs.eligibilities.create(union_id: 6)
head_greensperson = iatse.roles.create(name: "Head Greensperson")
head_greensperson.eligibilities.create(union_id: 3)
greensperson = iatse.roles.create(name: "Greensperson")
greensperson.eligibilities.create(union_id: 3)
# grips = iatse.roles.create(name: "Grips") "Grip" already exists
grip.eligibilities.create(union_id: 3)
#grips.eligibilities.create(union_id: 6)
lx = iatse.roles.create(name: "Lighting / Electrics (LX)")
lx.eligibilities.create(union_id: 3)
#lx.eligibilities.create(union_id: 6)
hair = iatse.roles.create(name: "Hair")
hair.eligibilities.create(union_id: 3)
make = iatse.roles.create(name: "Make Up")
make.eligibilities.create(union_id: 3)
accountant = iatse.roles.create(name: "Accountant")
accountant.eligibilities.create(union_id: 3)
props = iatse.roles.create(name: "Properties (Props)")
props.eligibilities.create(union_id: 3)
script_sup = iatse.roles.create(name: "Script Supervisors")
script_sup.eligibilities.create(union_id: 3)
#script_sup.eligibilities.create(union_id: 6)
set_dec = iatse.roles.create(name: "Set Decorator")
set_dec.eligibilities.create(union_id: 3)
#set_dec.eligibilities.create(union_id: 6)
sound = iatse.roles.create(name: "Sound")
sound.eligibilities.create(union_id: 3)
#sound.eligibilities.create(union_id: 6)
spfx = iatse.roles.create(name: "Special Effects (SPFX)")
spfx.eligibilities.create(union_id: 3)
#spfx.eligibilities.create(union_id: 6)
office = iatse.roles.create(name:"Office")
office.eligibilities.create(union_id: 3)
#office.eligibilities.create(union_id: 6)
production = iatse.roles.create(name: "Production")
production.eligibilities.create(union_id: 3)
#production.eligibilities.create(union_id: 6)

# acfc
catering = acfc.roles.create(name: "Catering")
#catering.eligibilities.create(union_id: 6)
animals = acfc.roles.create(name: "Animals")
#animals.eligibilities.create(union_id: 6)
wranglers = acfc.roles.create(name: "Wrangler")
#wranglers.eligibilities.create(union_id: 6)
scenic_art = acfc.roles.create(name: "Scenic Art")
#scenic_art.eligibilities.create(union_id: 6)
publicity = acfc.roles.create(name: "Publicity")
#publicity.eligibilities.create(union_id: 6)
prop_building = acfc.roles.create(name: "Prop Building")
#prop_building.eligibilities.create(union_id: 6)

# acfc, teamsters
security = acfc.roles.create(name: "Security")
security.eligibilities.create(union_id: 4)
#security.eligibilities.create(union_id: 6)

# teamsters
captain = teamsters.roles.create(name: "Captain")
#captain.eligibilities.create(union_id: 6)
co_captain = teamsters.roles.create(name: "Co-Captain")
#co_captain.eligibilities.create(union_id: 6)
driver = teamsters.roles.create(name: "Driver")
picture_car = teamsters.roles.create(name: "Picture Car")
#picture_car.eligibilities.create(union_id: 6)

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
visual_FX_animators = none.roles.create(name: "Visual FX Animator")
visual_FX_compositors = none.roles.create(name: "Visual FX Compositor")
visual_FX_artists = none.roles.create(name: "Visual FX Artist")
production_coordinator = none.roles.create(name: "Production Coordinator")
gennie_op = none.roles.create(name: "Gennie Op")
designer = none.roles.create(name: "Designer")
camera_operator = none.roles.create(name: "Camera Operator")
camera_assist_1 = none.roles.create(name: "1st Camera Assist")
camera_assist_2 = none.roles.create(name: "2nd Camera Assist")
dit = none.roles.create(name: "DIT")
scripty = none.roles.create(name: "Scripty")
transport_captain = none.roles.create(name: "Transport Captain")
special_fx_make_up = none.roles.create(name: "Special Effects Make Up")
assistant_production_coordinator = none.roles.create(name: "Assistant Production Coordinator")
sound_editor = none.roles.create(name: "Sound Editor")
boom_op = none.roles.create(name: "Boom Op")


# no union in addition to another union (see earlier)
key_grip.eligibilities.create(union_id: 6)
grip.eligibilities.create(union_id: 6)
gaffer.eligibilities.create(union_id: 6)
lamp_op.eligibilities.create(union_id: 6)
props_master.eligibilities.create(union_id: 6)
props_buyer.eligibilities.create(union_id: 6)
props.eligibilities.create(union_id: 6)
set_dec.eligibilities.create(union_id: 6)
greensperson.eligibilities.create(union_id: 6)
paint.eligibilities.create(union_id: 6)
trainee.eligibilities.create(union_id: 6)
driver.eligibilities.create(union_id: 6)
cost.eligibilities.create(union_id: 6)
make.eligibilities.create(union_id: 6)
hair.eligibilities.create(union_id: 6)
accountant.eligibilities.create(union_id: 6)
editor.eligibilities.create(union_id: 6)
sound_mixer.eligibilities.create(union_id: 6)
sound_assist.eligibilities.create(union_id: 6)
facs.eligibilities.create(union_id: 6)
vfx.eligibilities.create(union_id: 6)
construction.eligibilities.create(union_id: 6)



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


