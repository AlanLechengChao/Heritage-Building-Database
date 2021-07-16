import csv
import json

digit = {'一': 1, '二': 2, '三': 3, '四': 4,
         '五': 5, '六': 6, '七': 7, '八': 8, '九': 9}


with open('designations.csv', 'r', newline='') as file:
    with open('output.json', 'w') as jsonOutput:
        reader = csv.DictReader(file)
        datalist = []
        for row in reader:
            if '国' in row['designation']:
                row['level'] = 'national'
            elif '市' in row['designation']:
                row['level'] = 'provincial'
            
            row['batch'] = digit[row['designation'][1]]
            if '文物保护单位' in row['designation']:
                row['type'] = '文物保护单位'
            elif '优秀历史建筑' in row['designation']:
                row['type'] = '优秀历史建筑'
            datalist.append(row)
        json.dump(datalist, jsonOutput)
