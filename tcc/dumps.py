## take the posts and save the suggestions

import itertools
import codecs
import json
import numpy as np
import pandas as pd
import hunspell

data_hu = pd.read_json('hungarian.txt')
file = open('italian.txt', 'r')
data_it = []
for line in file:
    data_it.append(json.loads(line))

data_it = pd.DataFrame(data_it)

# remove all breaklines
it_posts = data_it["text"].apply(lambda x: x.replace("\n\n\n\n", ""))

# save hungarian separated by posts
hu_posts = data_hu['text']

hu_spellchecker = hunspell.HunSpell('/home/rgomes/dictionaries/dictionaries/hu/index.dic', '/home/rgomes/dictionaries/dictionaries/hu/index.aff')
it_spellchecker = hunspell.HunSpell('/home/rgomes/dictionaries/dictionaries/it/index.dic', '/home/rgomes/dictionaries/dictionaries/it/index.aff')

""" 
X = data_hu["text"].apply(lambda x: x.replace(".", " "))
X = X.apply(lambda x: x.replace(",", " "))
X = X.apply(lambda x: x.replace("\n", " "))
X = X.apply(lambda x: x.split(" "))

X = X.values.tolist()
X = list(itertools.chain.from_iterable(X))

spellings = [[x, hu_spellchecker.spell(x)] for x in X]


hu_not_recognized = filter(lambda x: x[1] == False, spellings)
hu_recognized = filter(lambda x: x[1] == True, spellings)

# hungarian errors
hu_errors_file = open('../hungarian_errors.txt','w') 
for line in hu_not_recognized:
    #print(line)
    if line and line[0].strip() and line != '\n':
        hu_errors_file.write("{}\n".format(line[0]))
hu_errors_file.close()

# hungarin recognized
hu_recognized_file = open('../hungarian_recognized.txt','w') 
for line in hu_recognized:
    #print(line)
    if line and line[0].strip():
        hu_recognized_file.write("{}\n".format(line[0]))
hu_recognized_file.close()
 """

X = data_it["text"].apply(lambda x: x.replace(".", " "))
X = X.apply(lambda x: x.replace(",", " "))
X = X.apply(lambda x: x.replace("\n\n\n\n", ""))
X = X.apply(lambda x: x.split(" "))
X = X.values.tolist()
X = list(itertools.chain.from_iterable(X))

spellings = [[x, it_spellchecker.spell(x)] for x in X]

it_not_recognized = filter(lambda x: x[1] == False, spellings)

# save suggestions to be solved by the volunteer
it_suggestions_file = open('italian_suggestions.json','w') 
words = filter(lambda x : x and x[0] and x[0].strip() != '', it_not_recognized)
words = list(map(lambda x : json.dumps(it_spellchecker.suggest(x[0])), words))
print(words[:10])


