dotapicks
=========

A json database of dota heros and their counters

Heros are described in the following format
```
"Bloodseeker" : {
  "nicknames":"bs",
  "winningMatchups":{
    "Slark":2
}}
```

### Hero names ##
All hero names are exactly as they appear on http://www.dota2.com/heroes/ this lends its self well to pulling imagines and data from dota2.com. For heros with multi-word names one needs to replace the space character with _ when quering dota2.com. For example Outworld Devourer's page can be found at http://www.dota2.com/hero/Outworld_Devourer/. 

### Matchups ###
Only positive matchups are recorded, and are ranked on a scale from 1-3. Where 3 indicates the hero is a hard counter.

### Nicknames ###
Nicknames are common names used in the dota 2 community to refer to a hero. Some of these names come from other games (dota, HoN), and some are just shorthand versions. This value can be a string, or an array of strings depending on how many nicknames the hero has.

## Database structure ##
Keep it flat. When it using this database in an application one should optimize it for the way it will be used. E.G. if you need fast lookups reolving a nickname to a hero build a dictionary rather than using the database directly.