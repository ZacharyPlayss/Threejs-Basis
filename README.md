# Three.js basis
Deze repository bied een startpunt voor Three.js. 
De basisconfiguratie werd reeds geïmplementeerd. 
Er werd ook lil-gui aan toegevoegd, 
dit is een kleine afzonderlijke package die een grafische interface 
biedt voor 3D element gerelateerde aanpassingen visueel uit te testen.

## Te verwijderen voor gebruik.

De volgende onderdelen zijn alleen bedoeld voor het ontwikkelen en testen van de aangeleverde bestanden!
- ./automated-testing (test bestanden die de aangeleverde code uittesten en valideren)
- .github: action die de tests automatisch uitvoert bij push.

## Te verwijderen voor productie.
De volgende onderdelen horen niet thuis in een productie omgeving:
- lil-gui (debugging package)
- lil-gui-helper (helper script voor lil gui)

## Features
- Three.js: Basis structuur en configuratie om 3D elementen te renderen in scenes.
- lil-gui: Een eenvoudige grafische interface om aanpassingen te maken aan scene specifieke parameters.
- scripts/lil-gui-helper: 
Deze helper library bied eenvoudige functies om te werken met lil-gui debugging.

## Packages
> Packages used:
> - three.js r182
> - lil-gui 21.0
> - Helper library (zacharyvds)
