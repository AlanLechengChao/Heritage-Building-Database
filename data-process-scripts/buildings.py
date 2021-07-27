import csv
import json

buildings_macro_list = []
# wenbao_id_set = set()
## 纪念地点是什么 -- 问richard
## TKTK 是什么
designations_strings = set()




## a building data structure
# {
#   'wenbao_id': --- currently discard TKTK in pre1979
#   'youxiu_id':
#   'current_name': [] or '' --- 优先用优秀历史建筑list的current name
#   'former_names': [] --- wenbao['文物保护单位名称'], youxiu['original_name_cn'], pre1979['name']
#   'english_names': youxiu['name-en'], pre1979['English name'], 
#   'current_address': '' or [] --- wenbao['地点 Address'], youxiu['address']
#   'former_addresses': [] pre1979['address_legacy']
#   'era': wenbao['市文保单位类别 Provincial Subcategory'], pre1979['period']
#   'year': wenbao['年代 Year'], youxiu['year_built']
#   'coordinates':
#   'designations': []
# }

with open('wenbao.csv') as wenbao:

    wenbao_reader = csv.DictReader(wenbao)
    wenbao_list = [row for row in wenbao_reader]

    # pre1979_reader = csv.DictReader(pre1979)
    # pre1979_list = [row for row in pre1979_reader]
    # for row in pre1979_reader:
    #     print(row)

    # youxiu_reader = csv.DictReader(youxiu)
    # youxiu_list = [row for row in youxiu_reader]
    # for row in youxiu_reader:
    #     print()
    

    #### step 1
    # for row_y in youxiu_list:
    #     building = {}
    #     building['youxiu_id'] = row_y['ID']
    #     building['current_name'] = row_y['current_use']
    #     building['former_names'] = [row_y['original_name_cn']]
    #     building['english_names'] = [row_y['name_en']]
    #     building['current_address'] = [row_y['address']]
    #     building['year'] = [row_y['year_built']]
    #     building['designations'] = [row_y['year'] + "-provicial-优秀历史建筑"]
    #     if row_y['wenbao_id'] != '':
    #         for row_w in wenbao_list:
    #             if row_y['wenbao_id'] == row_w['id']:
    #                 wenbao_id_set.add(row_y['wenbao_id'])
    #                 building['wenbao_id'] = row_y['wenbao_id']
    #                 if row_w['文物保护单位名称'] != row_y['current_use'] or row_w['文物保护单位名称'] != row_y['original_name_cn']:    
    #                     building['former_names'].append(row_w['文物保护单位名称'])
    #                 if row_w['年代 Year'] != row_y['year_built']:
    #                     building['year'].append(row_w['年代 Year'])
    #                 if row_w['地点 Address'] != row_y['address']:
    #                     building['current_address'].append(row_w['地点 Address'])
    #     buildings_macro_list.append(building)
        # print(building)
        # print("---------------------------------")
    for row_w in wenbao_list:
        if row_w['id'] == "TKTK":
            continue
        # if row_w['id'] not in wenbao_id_set:
        building = {}
            # building['wenbao_id'] = row_w['id']
            # building['current_name'] = row_w['文物保护单位名称']
            # building['former_names'] = []
            # building['english_names'] = []
            # building['current_address'] = row_w['地点 Address']
            # building['year'] = row_w['年代 Year']
        building['wenbao_id'] = row_w['id']
        building['designations'] = row_w['designations'].split('\n')
        # building['designations'].append(row_w['市文保单位批次 Provincial-Lot'])

        # building['designations'] += row_w['Earlier designation time'].split('\n')

        for d in building['designations']:
            designations_strings.add(d)
        # else:
        #     for b in buildings_macro_list:
        #         if b.get('wenbao_id') == row_w['id']:
        #             building = b
        #             break
        # if row_w['市文保单位类别 Provincial Subcategory'] != "":
        #     building['era'] = [row_w['市文保单位类别 Provincial Subcategory']]
        # for row_p in pre1979_list:
        #     if row_p['id'] == row_w['id']:
        #         pass
                # building['former_names'].append(row_p['name'])
                # building['english_names'].append(row_p['English name'])
                # if building.get('era'):
                #     building['era'].append(row_p['period'])
                # else:
                #     building['era'] = row_p['period']
        # if row_w['id'] not in wenbao_id_set:
        buildings_macro_list.append(building)
    print(designations_strings)
# with open('wenbao_designations.json', 'w') as jsonOutput:
#     json.dump(buildings_macro_list, jsonOutput)

    
