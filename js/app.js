'use strict';

const app = document.querySelector('app');


const loading = $.dom('loading-text', { innerText:'Loading...' });

app.appendChild(loading);


const workshop = new WUWorkshop();

workshop.style.opacity = '0';
workshop.style.visibility = 'hidden';

app.appendChild(workshop);


const onEverythingReady = setInterval(() =>
{
    if (!workshop.ready || document.readyState !== 'complete') return;
    
    clearInterval(onEverythingReady);

    loading.innerText = 'Welcome';

    setTimeout(() =>
    {
        loading.remove();
        workshop.style.opacity = '1';
        workshop.style.visibility = 'visible';
    }, 2000);
});


// Define stats

workshop.statsData = {
    weight:    { name:'weight',    type:'num', inputs:1, color:'999999', context:'Weight' },
    health:    { name:'health',    type:'num', inputs:1, color:'DDDDDD', buff:{ mode:'+', amount:300 }, context:'Hit Points' },
    eneCap:    { name:'eneCap',    type:'num', inputs:1, color:'00AAEE', buff:{ mode:'*', amount:1.2 }, context:'Energy Capacity' },
    eneReg:    { name:'eneReg',    type:'num', inputs:1, color:'00BFBF', buff:{ mode:'*', amount:1.2 }, context:'Energy Regeneration' },
    heaCap:    { name:'heaCap',    type:'num', inputs:1, color:'FF5500', buff:{ mode:'*', amount:1.2 }, context:'Heat Capacity' },
    heaCol:    { name:'heaCol',    type:'num', inputs:1, color:'DDDDDD', buff:{ mode:'*', amount:1.2 }, context:'Heat Cooling' },
    phyRes:    { name:'phyRes',    type:'num', inputs:1, color:'FFBB33', buff:{ mode:'*', amount:1.4 }, context:'Physical Resistance' },
    expRes:    { name:'expRes',    type:'num', inputs:1, color:'FF6622', buff:{ mode:'*', amount:1.4 }, context:'Explosive Resistance' },
    eleRes:    { name:'eleRes',    type:'num', inputs:1, color:'33BBFF', buff:{ mode:'*', amount:1.4 }, context:'Electric Resistance' },
    phyDmg:    { name:'phyDmg',    type:'num', inputs:2, color:'FFBB00', buff:{ mode:'*', amount:1.2 }, context:'Physical Damage'},
    phyResDmg: { name:'phyResDmg', type:'num', inputs:1, color:'DDAA00', context:'Physical Resistance Damage' },
    expDmg:    { name:'expDmg',    type:'num', inputs:2, color:'FF5500', buff:{ mode:'*', amount:1.2 }, context:'Explosive Damage'},
    heaDmg:    { name:'heaDmg',    type:'num', inputs:1, color:'FF5500', buff:{ mode:'*', amount:1.2 }, context:'Heat Damage'},
    heaCapDmg: { name:'heaCapDmg', type:'num', inputs:1, color:'994499', buff:{ mode:'*', amount:1.2 }, context:'Heat Capacity Damage'},
    heaColDmg: { name:'heaColDmg', type:'num', inputs:1, color:'994499', buff:{ mode:'*', amount:1.2 }, context:'Heat Cooling Damage'},
    expResDmg: { name:'expResDmg', type:'num', inputs:1, color:'DD4400', context:'Explosive Resistance Damage' },
    eleDmg:    { name:'eleDmg',    type:'num', inputs:2, color:'00BBFF', buff:{ mode:'*', amount:1.2 }, context:'Electric Damage'},
    eneDmg:    { name:'eneDmg',    type:'num', inputs:1, color:'00BBFF', buff:{ mode:'*', amount:1.2 }, context:'Energy Damage'},
    eneCapDmg: { name:'eneCapDmg', type:'num', inputs:1, color:'994499', buff:{ mode:'*', amount:1.2 }, context:'Energy Capacity Damage'},
    eneRegDmg: { name:'eneRegDmg', type:'num', inputs:1, color:'994499', buff:{ mode:'*', amount:1.2 }, context:'Energy Regeneration Damage'},
    eleResDmg: { name:'eleResDmg', type:'num', inputs:1, color:'00AADD', context:'Electric Resistance Damage' },
    range:     { name:'range',     type:'num', inputs:2, color:'DDDDDD', context:'Range' },
    push:      { name:'push',      type:'num', inputs:1, color:'DDDDDD', context:'Knockback' },
    pull:      { name:'pull',      type:'num', inputs:1, color:'DDDDDD', context:'Pull' },
    recoil:    { name:'recoil',    type:'num', inputs:1, color:'DDDDDD', context:'Recoil' },
    retreat:   { name:'retreat',   type:'num', inputs:1, color:'DDDDDD', context:'Retreat' },
    advance:   { name:'advance',   type:'num', inputs:1, color:'DDDDDD', context:'Advance' },
    walk:      { name:'walk',      type:'num', inputs:1, color:'DDDDDD', context:'Walking Distance' },
    jump:      { name:'jump',      type:'num', inputs:1, color:'DDDDDD', context:'Jumping Distance' },
    uses:      { name:'uses',      type:'num', inputs:1, color:'22FF22', context:'Max Uses' },
    backFire:  { name:'backFire',  type:'num', inputs:1, color:'AA0000', context:'BackFire' },
    heaCost:   { name:'heaCost',   type:'num', inputs:1, color:'882200', context:'Heat Generation' },
    eneCost:   { name:'eneCost',   type:'num', inputs:1, color:'005588', context:'Energy Consumption' },
    jumpReq:   { name:'jumpReq',   type:'boo', inputs:0, color:'FF6644', context:'Jumping Required' },
};

// End of Define stats


// Define items

workshop.officialItems = [{
        name: 'Interceptor',
        type: 1,
        element: 1,
        tiers: [0, 5],
        stats: {
            weight: 309,
            health: 860,
            eneCap: 193,
            eneReg: 56,
            heaCap: 265,
            heaCol: 80,
            phyRes: 16,
            expRes: 22,
            eleRes: 22
        },
        attachment: {
            leg1:  { x:58,  y:189 },
            leg2:  { x:134, y:189 },
            side1: { x:64,  y:141 },
            side2: { x:133, y:141 },
            side3: { x:60,  y:89 },
            side4: { x:137, y:89 },
            top1:  { x:59,  y:44 },
            top2:  { x:122, y:44 }
        }
    }, {
        name: 'Archimonde',
        type: 1,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 363,
            health: 1090,
            eneCap: 265,
            eneReg: 76,
            heaCap: 265,
            heaCol: 76,
            phyRes: 22,
            expRes: 22,
            eleRes: 22,
        },
        attachment: {
            leg1: { x:53, y:214 },
            leg2: { x:116, y:214 },
            side1: { x:49, y:176 },
            side2: { x:116, y:176 },
            side3: { x:45, y:128 },
            side4: { x:120, y:128 },
            top1: { x:41, y:83 },
            top2: { x:101, y:83 }
        }
    }, {
        name: 'Avenger',
        type: 1,
        element: 1,
        tiers: [2, 5],
        stats: {
            weight: 350,
            health: 1271,
            eneCap: 193,
            eneReg: 64,
            heaCap: 145,
            heaCol: 48,
            phyRes: 16,
            expRes: 22,
            eleRes: 22,
        },
        attachment: {
            leg1: { x:60, y:168 },
            leg2: { x:123, y:168 },
            side1: { x:65, y:128 },
            side2: { x:145, y:128 },
            side3: { x:58, y:92 },
            side4: { x:146, y:92 },
            top1: { x:57, y:28 },
            top2: { x:120, y:28 }
        }
    }, {
        name: 'Hollow Spectral Armor',
        type: 1,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 370,
            health: 1589,
            eneCap: 241,
            eneReg: 80,
            heaCap: 241,
            heaCol: 80,
        },
        attachment: {
            leg1: { x:63, y:189 },
            leg2: { x:125, y:189 },
            side1: { x:60, y:148 },
            side2: { x:140, y:148 },
            side3: { x:54, y:80 },
            side4: { x:142, y:80 },
            top1: { x:53, y:24 },
            top2: { x:107, y:24 }
        }
    }, {
        name: 'Nightmare',
        type: 1,
        element: 2,
        tiers: [0, 5],
        stats: {
            weight: 315,
            health: 879,
            eneCap: 193,
            eneReg: 64,
            heaCap: 290,
            heaCol: 96,
            phyRes: 22,
            expRes: 16,
            eleRes: 22,
        },
        attachment: {
            leg1: { x:58, y:189 },
            leg2: { x:133, y:189 },
            side1: { x:64, y:141 },
            side2: { x:133, y:141 },
            side3: { x:60, y:89 },
            side4: { x:137, y:89 },
            top1: { x:59, y:44 },
            top2: { x:122, y:44 }
        }
    }, {
        name: 'Brutality',
        type: 1,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 341,
            health: 1033,
            eneCap: 217,
            eneReg: 64,
            heaCap: 290,
            heaCol: 88,
            phyRes: 22,
            expRes: 16,
            eleRes: 22,
        },
        attachment: {
            leg1: { x:108, y:216 },
            leg2: { x:182, y:216 },
            side1: { x:106, y:176 },
            side2: { x:203, y:176 },
            side3: { x:101, y:128 },
            side4: { x:210, y:128 },
            top1: { x:110, y:48 },
            top2: { x:184, y:48 }
        }
    }, {
        name: 'Windigo',
        type: 1,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 345,
            health: 982,
            eneCap: 217,
            eneReg: 72,
            heaCap: 301,
            heaCol: 112,
            phyRes: 22,
            expRes: 16,
            eleRes: 22,
        },
        attachment: {
            leg1: { x:76, y:199 },
            leg2: { x:167, y:199 },
            side1: { x:91, y:156 },
            side2: { x:219, y:156 },
            side3: { x:84, y:112 },
            side4: { x:221, y:112 },
            top1: { x:77, y:64 },
            top2: { x:189, y:64 }
        }
    }, {
        name: 'Zarkares',
        type: 1,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 362,
            health: 1136,
            eneCap: 193,
            eneReg: 64,
            heaCap: 312,
            heaCol: 112,
            phyRes: 16,
            expRes: 24,
            eleRes: 16,
        },
        attachment: {
            leg1: { x:65, y:182 },
            leg2: { x:129, y:182 },
            side1: { x:75, y:143 },
            side2: { x:145, y:143 },
            side3: { x:71, y:98 },
            side4: { x:151, y:98 },
            top1: { x:66, y:44 },
            top2: { x:128, y:44 }
        }
    }, {
        name: 'Molten Platinum Vest',
        type: 1,
        element: 2,
        tiers: [3, 5],
        stats: {
            weight: 346,
            health: 982,
            eneCap: 193,
            eneReg: 64,
            heaCap: 267,
            heaCol: 96,
            phyRes: 44,
            expRes: 16,
            eleRes: 22,
        },
        attachment: {
            leg1: { x:63, y:189 },
            leg2: { x:125, y:189 },
            side1: { x:60, y:148 },
            side2: { x:140, y:148 },
            side3: { x:54, y:80 },
            side4: { x:142, y:80 },
            top1: { x:53, y:24 },
            top2: { x:107, y:24 }
        }
    }, {
        name: 'Sabretooth',
        type: 1,
        element: 2,
        tiers: [4, 5],
        stats: {
            weight: 362,
            health: 1136,
            eneCap: 193,
            eneReg: 64,
            heaCap: 312,
            heaCol: 112,
            phyRes: 16,
            expRes: 24,
            eleRes: 16,
        },
        attachment: {
            leg1: { x:102, y:218 },
            leg2: { x:164, y:218 },
            side1: { x:101, y:164 },
            side2: { x:176, y:164 },
            side3: { x:94, y:117 },
            side4: { x:182, y:117 },
            top1: { x:103, y:42 },
            top2: { x:178, y:42 }
        }
    }, {
        name: 'Sith',
        type: 1,
        element: 3,
        tiers: [0, 5],
        stats: {
            weight: 312,
            health: 930,
            eneCap: 245,
            eneReg: 112,
            heaCap: 193,
            heaCol: 64,
            phyRes: 22,
            expRes: 22,
            eleRes: 16,
        },
        attachment: {
            leg1: { x:56, y:189 },
            leg2: { x:132, y:189 },
            side1: { x:62, y:141 },
            side2: { x:131, y:141 },
            side3: { x:58, y:89 },
            side4: { x:135, y:89 },
            top1: { x:57, y:43 },
            top2: { x:121, y:43 }
        }
    }, {
        name: 'Naga',
        type: 1,
        element: 3,
        tiers: [2, 5],
        stats: {
            weight: 335,
            health: 982,
            eneCap: 279,
            eneReg: 104,
            heaCap: 193,
            heaCol: 72,
            phyRes: 22,
            expRes: 22,
            eleRes: 16
        },
        attachment: {
            leg1: { x:37, y:172 },
            leg2: { x:101, y:172 },
            side1: { x:61, y:117 },
            side2: { x:123, y:117 },
            side3: { x:62, y:63 },
            side4: { x:135, y:63 },
            top1: { x:59, y:27 },
            top2: { x:128, y:27 }
        }
    }, {
        name: 'GrimReaper',
        type: 1,
        element: 3,
        tiers: [2, 5],
        stats: {
            weight: 329,
            health: 879,
            eneCap: 346,
            eneReg: 112,
            heaCap: 193,
            heaCol: 64,
            phyRes: 22,
            expRes: 22,
            eleRes: 16,
        },
        attachment: {
            leg1: { x:47, y:188 },
            leg2: { x:111, y:188 },
            side1: { x:64, y:146 },
            side2: { x:142, y:146 },
            side3: { x:61, y:95 },
            side4: { x:149, y:95 },
            top1: { x:58, y:67 },
            top2: { x:124, y:67 }
        }
    }, {
        name: 'Lightning Platinum Vest',
        svg: true,
        type: 1,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 346,
            health: 982,
            eneCap: 267,
            eneReg: 96,
            heaCap: 193,
            heaCol: 64,
            phyRes: 44,
            expRes: 22,
            eleRes: 16,
        },
        attachment: {
            leg1: { x:63, y:189 },
            leg2: { x:125, y:189 },
            side1: { x:60, y:148 },
            side2: { x:140, y:148 },
            side3: { x:54, y:80 },
            side4: { x:142, y:80 },
            top1: { x:53, y:24 },
            top2: { x:107, y:24 }
        }
    }, {
        name: 'Iron Boots',
        type: 2,
        element: 1,
        tiers: [0, 5],
        stats: {
            weight: 138,
            health: 472,
            phyDmg: [163, 213],
            push: 1,
            range: [1, 0],
            walk: 1,
            jump: 2,
        },
        attachment: { x:60, y:13 }
    }, {
        name: 'Rolling Beasts',
        type: 2,
        element: 1,
        attachment: { x:111, y:22 },
        tiers: [3, 5],
        stats: {
            weight: 134,
            health: 451,
            phyDmg: [160, 242],
            push: 1,
            range: [1, 0],
            walk: 3,
        }
    }, {
        name: 'Grave Diggers',
        type: 2,
        element: 1,
        attachment: { x:57, y:22 },
        tiers: [1, 5],
        stats: {
            weight: 123,
            health: 287,
            phyDmg: [223, 285],
            push: 2,
            range: [1, 0],
            walk: 1,
            jump: 2
        }
    }, {
        name: 'The Claw',
        type: 2,
        element: 1,
        attachment: { x:116, y:24 },
        tiers: [3, 5],
        stats: {
            weight: 150,
            health: 860,
            phyDmg: [79, 111],
            range: [1, 0],
        }
    }, {
        name: 'Scorching Feet',
        type: 2,
        element: 2,
        attachment: { x:60, y:13 },
        tiers: [0, 5],
        stats: {
            weight: 120,
            health: 413,
            expDmg: [143, 187],
            heaDmg: 36,
            push: 1,
            range: [1, 0],
            walk: 1,
            jump: 2,
        }
    }, {
        name: 'Devouring Paws',
        type: 2,
        element: 2,
        attachment: { x:62, y:22 },
        tiers: [2, 5],
        stats: {
            weight: 119,
            health: 394,
            expDmg: [140, 220],
            heaDmg: 44,
            push: 1,
            range: [1, 0],
            walk: 1,
            jump: 2,
        }
    }, {
        name: 'Dynamite Boots',
        type: 2,
        element: 2,
        attachment: { x:52, y:19 },
        tiers: [2, 5],
        stats: {
            weight: 136,
            health: 413,
            expDmg: [133, 224],
            heaDmg: 29,
            push: 2,
            range: [1, 0],
            walk: 1,
            jump: 2,
        }
    }, {
        name: 'Charged Walkers',
        type: 2,
        element: 3,
        attachment: { x:60, y:13 },
        tiers: [0, 5],
        stats: {
            weight: 122,
            health: 413,
            eleDmg: [143, 187],
            eneDmg: 48,
            push: 1,
            range: [1, 0],
            walk: 1,
            jump: 2,
        }
    }, {
        name: 'Dynamic Stompers',
        type: 2,
        element: 3,
        attachment: { x:64, y:27 },
        tiers: [2, 5],
        stats: {
            weight: 118,
            health: 372,
            eleDmg: [154, 217],
            eneDmg: 58,
            push: 1,
            range: [1, 0],
            walk: 1,
            jump: 2,
        }
    }, {
        name: 'Sparked Runners',
        type: 2,
        element: 3,
        attachment: { x:115, y:22 },
        tiers: [4, 5],
        stats: {
            weight: 114,
            health: 363,
            eleDmg: [135, 249],
            eneDmg: 38,
            push: 1,
            range: [1, 0],
            walk: 3,
        }
    }, {
        name: 'Lightning Supporters',
        type: 2,
        element: 3,
        attachment: { x:78, y:20 },
        tiers: [3, 5],
        stats: {
            weight: 124,
            health: 413,
            eleDmg: [127, 192],
            eneDmg: 67,
            push: 1,
            range: [1, 0],
            walk: 1,
            jump: 2,
        }
    }, {
        name: 'Recoil Stompers',
        type: 2,
        element: 3,
        attachment: { x:52, y:19 },
        tiers: [2, 5],
        stats: {
            weight: 138,
            health: 413,
            eleDmg: [140, 216],
            eneDmg: 38,
            push: 2,
            range: [1, 0],
            walk: 1,
            jump: 2,
        }
    }, {
        name: 'BackBreaker',
        type: 3,
        element: 1,
        attachment: { x:34, y:55 },
        tiers: [2, 5],
        stats: {
            weight: 44,
            phyDmg: [228, 408],
            heaColDmg: 8,
            eneRegDmg: 8,
            push: 1,
            range: [1, 0],
            eneCost: 31,
            heaCost: 31,
        }
    }, {
        name: 'War Hammer',
        type: 3,
        element: 1,
        attachment: { x:33, y:63 },
        tiers: [2, 5],
        stats: {
            weight: 58,
            phyDmg: [254, 427],
            heaCapDmg: 24,
            eneCapDmg: 24,
            push: 3,
            range: [1, 0],
            eneCost: 31,
            heaCost: 31,
        }
    }, {
        name: 'SeraphBlade',
        type: 3,
        element: 1,
        attachment: { x:38, y:71 },
        tiers: [3, 5],
        stats: {
            weight: 49,
            phyDmg: [234, 376],
            phyResDmg: 12,
            range: [1, 2],
            eneCost: 13,
            heaCost: 50,
        }
    }, {
        name: 'Annihilation',
        type: 3,
        element: 1,
        attachment: { x:42, y:45 },
        tiers: [2, 5],
        stats: {
            weight: 65,
            phyDmg: [203, 341],
            phyResDmg: 15,
            range: [1, 2],
            uses: 3,
        }
    }, {
        name: 'Mercy',
        type: 3,
        element: 1,
        attachment: { x:44, y:26 },
        tiers: [3, 5],
        stats: {
            weight: 84,
            phyDmg: [197, 440],
            phyResDmg: 10,
            push: 1,
            range: [1, 2],
            uses: 3,
        }
    }, {
        name: 'Armor Annihilator',
        type: 3,
        element: 1,
        attachment: { x:65, y:42 },
        tiers: [3, 5],
        stats: {
            weight: 17,
            phyDmg: [39, 52],
            phyResDmg: 50,
            range: [2, 4],
            uses: 1,
        },
    }, {
        name: 'Advanced Repulser',
        type: 3,
        element: 1,
        attachment: { x:60, y:57 },
        tiers: [3, 5],
        stats: {
            weight: 18,
            phyDmg: [72, 95],
            push: 4,
            range: [2, 4],
            heaCost: 62,
            uses: 2,
        },
    }, {
        name: 'Purifier',
        type: 3,
        element: 1,
        attachment: { x:55, y:41 },
        tiers: [3, 5],
        stats: {
            weight: 25,
            phyDmg: [184, 241],
            range: [2, 4],
            uses: 2,
        },
    }, {
        name: 'NightFall',
        type: 3,
        element: 1,
        attachment: { x:52, y:36 },
        tiers: [2, 5],
        stats: {
            weight: 49,
            phyDmg: [237, 355],
            phyResDmg: 11,
            range: [2, 4],
            uses: 3,
            eneCost: 31,
            heaCost: 31,
        },
    }, {
        name: 'BloodWeep',
        type: 3,
        element: 1,
        attachment: { x:38, y:38 },
        tiers: [3, 5],
        stats: {
            weight: 34,
            phyDmg: [147, 209],
            phyResDmg: 30,
            range: [2, 4],
            uses: 3,
            eneCost: 31,
            heaCost: 31,
        },
    }, {
        name: 'Terror Cry',
        type: 3,
        element: 1,
        attachment: { x:36, y:33 },
        tiers: [2, 5],
        stats: {
            weight: 46,
            phyDmg: [241, 358],
            push: 1,
            range: [2, 4],
            uses: 3,
            eneCost: 25,
            heaCost: 25,
        },
    }, {
        name: 'Sweetie',
        type: 3,
        element: 1,
        attachment: { x:49, y:45 },
        tiers: [3, 5],
        stats: {
            weight: 42,
            phyDmg: [169, 256],
            phyResDmg: 10,
            range: [3, 6],
            uses: 3,
            heaCost: 31,
        },
    }, {
        name: 'TerrorBlade',
        type: 3,
        element: 2,
        attachment: { x:34, y:55 },
        tiers: [3, 5],
        stats: {
            weight: 52,
            expDmg: [244, 319],
            heaDmg: 106,
            heaCapDmg: 51,
            push: 1,
            range: [1, 0],
            eneCost: 13,
            heaCost: 50,
        },
    }, {
        name: 'Flaming Hammer',
        type: 3,
        element: 2,
        attachment: { x:33, y:63 },
        tiers: [2, 5],
        stats: {
            weight: 60,
            expDmg: [229, 384],
            heaDmg: 86,
            heaColDmg: 20,
            push: 3,
            range: [1, 0],
            eneCost: 13,
            heaCost: 50,
        },
    }, {
        name: 'HeronMark',
        type: 3,
        element: 2,
        attachment: { x:38, y:45 },
        tiers: [3, 5],
        stats: {
            weight: 43,
            expDmg: [193, 311],
            heaDmg: 78,
            expResDmg: 9,
            range: [1, 2],
            eneCost: 13,
            heaCost: 50,
        },
    }, {
        name: 'Chaos Bringer',
        type: 3,
        element: 2,
        attachment: { x:43, y:39 },
        tiers: [3, 5],
        stats: {
            weight: 49,
            expDmg: [224, 228],
            heaDmg: 114,
            range: [1, 2],
            uses: 3,
            eneCost: 16,
            heaCost: 31,
        },
    }, {
        name: 'Crimson Rapture',
        type: 3,
        element: 2,
        attachment: { x:54, y:40 },
        tiers: [3, 5],
        stats: {
            weight: 52,
            expDmg: [163, 213],
            heaDmg: 135,
            heaCapDmg: 48,
            range: [1, 2],
            uses: 3,
            eneCost: 31,
            heaCost: 93,
        },
    }, {
        name: 'Reckoning',
        type: 3,
        element: 2,
        attachment: { x:44, y:26 },
        tiers: [3, 5],
        stats: {
            weight: 86,
            expDmg: [182, 406],
            heaDmg: 50,
            expResDmg: 10,
            push: 1,
            range: [1, 2],
            uses: 3,
            heaCost: 31,
        },
    }, {
        name: 'Basalt Dissolver',
        type: 3,
        element: 2,
        attachment: { x:65, y:42 },
        tiers: [3, 5],
        stats: {
            weight: 23,
            expDmg: [32, 65],
            heaDmg: 44,
            expResDmg: 45,
            range: [2, 4],
            uses: 1,
        },
    }, {
        name: 'Magma Blast',
        svg: true,
        type: 3,
        element: 2,
        attachment: { x:54, y:39 },
        tiers: [3, 5],
        stats: {
            weight: 55,
            expDmg: [211, 403],
            heaDmg: 79,
            expResDmg: 13,
            heaCapDmg: 30,
            heaColDmg: 17,
            push: 1,
            range: [2, 4],
            uses: 1,
            heaCost: 31,
        },
    }, {
        name: 'Sorrow',
        type: 3,
        element: 2,
        attachment: { x:55, y:41 },
        tiers: [3, 5],
        stats: {
            weight: 66,
            expDmg: [163, 213],
            heaDmg: 93,
            heaCapDmg: 12,
            range: [2, 4],
            heaCost: 31,
        },
    }, {
        name: 'Abomination',
        type: 3,
        element: 2,
        attachment: { x:49, y:37 },
        tiers: [3, 5],
        stats: {
            weight: 66,
            expDmg: [212, 307],
            heaDmg: 71,
            expResDmg: 12,
            push: 1,
            range: [2, 4],
            uses: 3,
            eneCost: 19,
            heaCost: 44,
        },
    }, {
        name: 'Heat Bomb',
        type: 3,
        element: 2,
        attachment: { x:55, y:35 },
        tiers: [2, 5],
        stats: {
            weight: 50,
            expDmg: [40, 59],
            heaDmg: 393,
            range: [2, 4],
            uses: 1,
            heaCost: 393,
        },
    }, {
        name: 'Corrupt Light',
        type: 3,
        element: 2,
        attachment: { x:42, y:40 },
        tiers: [1, 5],
        stats: {
            weight: 51,
            expDmg: [140, 236],
            heaDmg: 93,
            heaCapDmg: 24,
            range: [3, 6],
            eneCost: 16,
            heaCost: 47,
        },
    }, {
        name: 'DawnBlaze',
        type: 3,
        element: 2,
        attachment: { x:47, y:32 },
        tiers: [2, 5],
        stats: {
            weight: 52,
            expDmg: [210, 272],
            heaDmg: 71,
            expResDmg: 9,
            range: [3, 6],
            eneCost: 16,
            heaCost: 47,
        },
    }, {
        name: 'Flaminator',
        type: 3,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 47,
            expDmg: [148, 228],
            heaDmg: 93,
            heaCapDmg: 24,
            range: [3, 6],
            eneCost: 110,
        },
        attachment: { x:58, y:38 }
    }, {
        name: 'StormWeaver',
        type: 3,
        element: 3,
        attachment: { x:34, y:55 },
        tiers: [3, 5],
        stats: {
            weight: 56,
            eleDmg: [244, 319],
            eneDmg: 114,
            eneCapDmg: 32,
            push: 1,
            range: [1, 0],
            eneCost: 50,
            heaCost: 13,
        },
    }, {
        name: 'Viking Hammer',
        type: 3,
        element: 3,
        attachment: { x:33, y:63 },
        tiers: [2, 5],
        stats: {
            weight: 63,
            eleDmg: [211, 354],
            eneDmg: 114,
            eneRegDmg: 17,
            push: 3,
            range: [1, 0],
            eneCost: 50,
            heaCost: 13,
        },
    }, {
        name: 'BrightRoar',
        type: 3,
        element: 3,
        attachment: { x:38, y:46 },
        tiers: [3, 5],
        stats: {
            weight: 45,
            eleDmg: [193, 311],
            eneDmg: 103,
            eleResDmg: 9,
            range: [1, 2],
            eneCost: 50,
            heaCost: 13,
        },
    }, {
        name: 'BigDaddy',
        type: 3,
        element: 3,
        attachment: { x:52, y:54 },
        tiers: [3, 5],
        stats: {
            weight: 53,
            eleDmg: [202, 265],
            eneDmg: 152,
            range: [1, 2],
            uses: 3,
            eneCost: 47,
            heaCost: 16,
        },
    }, {
        name: 'Ash Creator',
        type: 3,
        element: 3,
        attachment: { x:54, y:40 },
        tiers: [3, 5],
        stats: {
            weight: 58,
            eleDmg: [163, 213],
            eneDmg: 180,
            eneCapDmg: 44,
            range: [1, 2],
            uses: 3,
            eneCost: 93,
            heaCost: 31,
        },
    }, {
        name: 'BullDog',
        type: 3,
        element: 3,
        attachment: { x:44, y:26 },
        tiers: [3, 5],
        stats: {
            weight: 73,
            eleDmg: [182, 406],
            eneDmg: 67,
            eleResDmg: 10,
            push: 1,
            range: [1, 2],
            uses: 3,
            eneCost: 31,
        },
    }, {
        name: 'Blizzard Dissolver',
        type: 3,
        element: 3,
        attachment: { x:65, y:42 },
        tiers: [3, 5],
        stats: {
            weight: 24,
            eleDmg: [34, 70],
            eneDmg: 63,
            eleResDmg: 50,
            range: [2, 4],
            uses: 1,
        },
    }, {
        name: 'EMP',
        type: 3,
        element: 3,
        attachment: { x:62, y:41 },
        tiers: [2, 5],
        stats: {
            weight: 70,
            eleDmg: [37, 61],
            eneDmg: 334,
            range: [2, 4],
            uses: 1,
            eneCost: 393,
        },
    }, {
        name: 'Mortal Bullet',
        type: 3,
        element: 3,
        attachment: { x:58, y:40 },
        tiers: [3, 5],
        stats: {
            weight: 56,
            eleDmg: [168, 218],
            eneDmg: 133,
            eneCapDmg: 12,
            range: [2, 4],
            eneCost: 31,
        },
    }, {
        name: 'Last Words',
        type: 3,
        element: 3,
        attachment: { x:42, y:33 },
        tiers: [2, 5],
        stats: {
            weight: 63,
            eleDmg: [185, 285],
            eneDmg: 95,
            eneRegDmg: 13,
            push: 1,
            range: [2, 4],
            uses: 3,
            eneCost: 47,
            heaCost: 16,
        },
    }, {
        name: 'Bunker Shell',
        type: 3,
        element: 3,
        attachment: { x:54, y:39 },
        tiers: [3, 5],
        stats: {
            weight: 50,
            eleDmg: [243, 463],
            eneDmg: 123,
            eleResDmg: 13,
            eneCapDmg: 30,
            eneRegDmg: 17,
            push: 1,
            range: [2, 4],
            uses: 1,
            eneCost: 31,
        },
    }, {
        name: 'Malice Beam',
        type: 3,
        element: 3,
        attachment: { x:43, y:41 },
        tiers: [1, 5],
        stats: {
            weight: 55,
            eleDmg: [140, 236],
            eneDmg: 123,
            eneCapDmg: 24,
            range: [3, 6],
            eneCost: 47,
            heaCost: 12,
        },
    }, {
        name: 'UltraBright',
        type: 3,
        element: 3,
        attachment: { x:47, y:32 },
        tiers: [2, 5],
        stats: {
            weight: 56,
            eleDmg: [203, 265],
            eneDmg: 95,
            eleResDmg: 5,
            range: [3, 6],
            eneCost: 47,
            heaCost: 16,
        },
    }, {
        name: 'Hot Flash',
        type: 3,
        element: 3,
        tiers: [2, 5],
        stats: {
            weight: 66,
            eleDmg: [148, 228],
            eneDmg: 142,
            eneCapDmg: 24,
            range: [3, 6],
            heaCost: 110,
        },
        attachment: { x:58, y:38 },
    }, {
        name: 'Hybrid Energy Cannon',
        type: 3,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 66,
            eleDmg: [159, 269],
            eneDmg: 139,
            eneCapDmg: 28,
            range: [3, 6],
            heaCost: 104,
        },
        attachment: { x:63, y:39 }
    }, {
        name: 'Hybrid Heat Cannon',
        type: 3,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 47,
            expDmg: [159, 269],
            heaDmg: 105,
            heaCapDmg: 33,
            range: [3, 6],
            eneCost: 104,
        },
        attachment: { x:63, y:39 }
    }, {
        name: 'Night Eagle',
        type: 4,
        element: 1,
        tiers: [2, 5],
        stats: {
            weight: 46,
            phyDmg: [209, 336],
            pull: 1,
            range: [3, 6],
            uses: 3,
            eneCost: 25,
            heaCost: 25,
        },
        attachment: { x:42, y:50 }
    }, {
        name: 'Spartan Carnage',
        type: 4,
        element: 1,
        attachment: { x:50, y:44 },
        tiers: [3, 5],
        stats: {
            weight: 51,
            phyDmg: [226, 387],
            phyResDmg: 15,
            range: [3, 6],
            uses: 3,
            eneCost: 31,
            heaCost: 31,
        }
    }, {
        name: 'Reckless Beam',
        type: 4,
        element: 1,
        attachment: { x:48, y:56 },
        tiers: [2, 5],
        stats: {
            weight: 35,
            phyDmg: [235, 355],
            range: [4, 8],
            eneCost: 25,
            heaCost: 25,
        }
    }, {
        name: 'Desert Fury',
        type: 4,
        element: 1,
        attachment: { x:37, y:34 },
        tiers: [3, 5],
        stats: {
            weight: 29,
            phyDmg: [154, 224],
            phyResDmg: 23,
            range: [4, 8],
            uses: 2,
            eneCost: 16,
            heaCost: 16,
        }
    }, {
        name: 'Mighty Cannon',
        svg: true,
        type: 4,
        element: 1,
        attachment: { x:56, y:35 },
        tiers: [3, 5],
        stats: {
            weight: 55,
            phyDmg: [239, 408],
            pull: 1,
            range: [4, 8],
            eneCost: 38,
            heaCost: 38,
        }
    }, {
        name: 'Falcon',
        type: 4,
        element: 1,
        attachment: { x:60, y:52 },
        tiers: [3, 5],
        stats: {
            weight: 19,
            phyDmg: [596, 997],
            range: [8, 0],
            uses: 1,
            eneCost: 22,
            heaCost: 22,
        }
    }, {
        name: 'Frantic Brute',
        svg: true,
        type: 4,
        element: 1,
        attachment: { x:40, y:50 },
        tiers: [3, 5],
        stats: {
            weight: 50,
            phyDmg: [69, 632],
            range: [3, 6],
            uses: 2,
            eneCost: 10,
            heaCost: 50,
        }
    }, {
        name: 'Supreme Cannon',
        type: 4,
        element: 2,
        attachment: { x:50, y:67 },
        tiers: [2, 5],
        stats: {
            weight: 66,
            expDmg: [205, 315],
            heaDmg: 71,
            expResDmg: 11,
            push: 1,
            range: [3, 6],
            uses: 3,
            eneCost: 19,
            heaCost: 44,
        }
    }, {
        name: 'Vandal Rage',
        type: 4,
        element: 2,
        attachment: { x:71, y:57 },
        tiers: [2, 5],
        stats: {
            weight: 41,
            expDmg: [143, 187],
            heaDmg: 44,
            expResDmg: 20,
            heaColDmg: 46,
            push: 1,
            range: [4, 5],
            uses: 1,
            heaCost: 25,
        }
    }, {
        name: 'Desolation',
        type: 4,
        element: 2,
        attachment: { x:39, y:77 },
        tiers: [2, 5],
        stats: {
            weight: 66,
            expDmg: [210, 310],
            heaDmg: 48,
            expResDmg: 10,
            range: [4, 8],
            uses: 3,
            heaCost: 81,
        }
    }, {
        name: 'Iron Frenzy',
        type: 4,
        element: 2,
        attachment: { x:62, y:81 },
        tiers: [3, 5],
        stats: {
            weight: 52,
            expDmg: [203, 265],
            heaDmg: 71,
            expResDmg: 5,
            range: [4, 8],
            eneCost: 16,
            heaCost: 47,
        }
    }, {
        name: 'Desert Snake',
        svg: true,
        type: 4,
        element: 2,
        attachment: { x:56, y:35 },
        tiers: [3, 5],
        stats: {
            weight: 63,
            expDmg: [192, 329],
            heaDmg: 71,
            heaColDmg: 7,
            pull: 1,
            range: [4, 8],
            eneCost: 25,
            heaCost: 75,
        }
    }, {
        name: 'Savagery',
        type: 4,
        element: 2,
        attachment: { x:48, y:56 },
        tiers: [2, 5],
        stats: {
            weight: 51,
            expDmg: [154, 232],
            heaDmg: 93,
            heaCapDmg: 24,
            range: [4, 8],
            eneCost: 16,
            heaCost: 47,
        }
    }, {
        name: 'Flaming Scope',
        type: 4,
        element: 2,
        attachment: { x:60, y:52 },
        tiers: [3, 5],
        stats: {
            weight: 21,
            expDmg: [568, 741],
            heaDmg: 212,
            expResDmg: 15,
            range: [8, 0],
            uses: 1,
            eneCost: 31,
            heaCost: 155,
        }
    }, {
        name: 'Burning Shower',
        type: 4,
        element: 2,
        attachment: { x:56, y:80 },
        tiers: [3, 5],
        stats: {
            weight: 75,
            expDmg: [173, 345],
            heaDmg: 86,
            expResDmg: 12,
            heaColDmg: 10,
            pull: 2,
            range: [4, 8],
            uses: 3,
            heaCost: 81,
        }
    }, {
        name: 'Red Rain',
        type: 4,
        element: 2,
        attachment: { x:36, y:79 },
        tiers: [3, 5],
        stats: {
            weight: 65,
            expDmg: [216, 341],
            heaDmg: 106,
            heaColDmg: 19,
            pull: 2,
            range: [2, 4],
            uses: 2,
            eneCost: 30,
            heaCost: 81,
        }
    }, {
        name: 'Grim Cobra',
        type: 4,
        element: 3,
        attachment: { x:42, y:50 },
        tiers: [2, 5],
        stats: {
            weight: 63,
            eleDmg: [181, 290],
            eneDmg: 95,
            eneRegDmg: 13,
            pull: 1,
            range: [3, 6],
            uses: 3,
            eneCost: 47,
            heaCost: 16,
        }
    }, {
        name: 'Hysteria',
        type: 4,
        element: 3,
        tiers: [2, 5],
        stats: {
            weight: 55,
            eleDmg: [169, 252],
            eneDmg: 129,
            eneCapDmg: 24,
            range: [4, 8],
            eneCost: 47,
            heaCost: 16,
        },
        attachment: { x:48, y:56 },
    }, {
        name: 'Valiant Sniper',
        type: 4,
        element: 3,
        attachment: { x:37, y:34 },
        tiers: [3, 5],
        stats: {
            weight: 51,
            eleDmg: [126, 183],
            eneDmg: 181,
            eleResDmg: 17,
            eneRegDmg: 13,
            range: [4, 8],
            uses: 2,
            eneCost: 31,
        }
    }, {
        name: 'SpineFall',
        svg: true,
        type: 4,
        element: 3,
        attachment: { x:56, y:35 },
        tiers: [3, 5],
        stats: {
            weight: 67,
            eleDmg: [192, 329],
            eneDmg: 105,
            eneRegDmg: 13,
            pull: 1,
            range: [4, 8],
            eneCost: 75,
            heaCost: 25,
        }
    }, {
        name: 'Delerium',
        type: 4,
        element: 3,
        attachment: { x:62, y:81 },
        tiers: [3, 5],
        stats: {
            weight: 56,
            eleDmg: [214, 289],
            eneDmg: 95,
            eleResDmg: 12,
            range: [4, 8],
            eneCost: 47,
            heaCost: 16,
        }
    }, {
        name: 'Lightning Scope',
        type: 4,
        element: 3,
        attachment: { x:60, y:52 },
        tiers: [3, 5],
        stats: {
            weight: 23,
            eleDmg: [568, 741],
            eneDmg: 283,
            eleResDmg: 15,
            range: [8, 0],
            uses: 1,
            eneCost: 155,
            heaCost: 31,
        }
    }, {
        name: 'Void',
        type: 5,
        element: 1,
        tiers: [2, 5],
        stats: {
            weight: 29,
            phyDmg: [143, 187],
            phyResDmg: 6,
            eneCost: 16,
            heaCost: 16,
        }
    }, {
        name: 'HurlBat',
        type: 5,
        element: 1,
        tiers: [2, 5],
        stats: {
            weight: 28,
            phyDmg: [135, 196],
            heaCapDmg: 6,
            eneCapDmg: 6,
            eneCost: 16,
            heaCost: 16,
        }
    }, {
        name: 'Greedy',
        type: 5,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 20,
            phyDmg: [72, 117],
            phyResDmg: 10,
            eneCost: 16,
            heaCost: 16,
        }
    }, {
        name: 'DustMaker',
        type: 5,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 29,
            phyDmg: [120, 213],
            heaColDmg: 4,
            eneRegDmg: 4,
            eneCost: 16,
            heaCost: 16,
        }
    }, {
        name: 'Backstabber',
        type: 5,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 51,
            phyDmg: [163, 263],
            pull: 1,
            eneCost: 16,
            heaCost: 16,
        }
    }, {
        name: 'Tonto',
        type: 5,
        element: 1,
        tiers: [2, 5],
        stats: {
            weight: 40,
            phyDmg: [184, 336],
            phyResDmg: 9,
            range: [2, 4],
            eneCost: 25,
            heaCost: 25,
        }
    }, {
        name: 'Solar Torch',
        type: 5,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 40,
            phyDmg: [193, 348],
            phyResDmg: 9,
            range: [3, 6],
            eneCost: 25,
            heaCost: 25,
        }
    }, {
        name: 'Clash',
        type: 5,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 43,
            expDmg: [103, 135],
            heaDmg: 36,
            expResDmg: 6,
            heaCost: 31,
        }
    }, {
        name: 'Nemo',
        type: 5,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 43,
            expDmg: [97, 141],
            heaDmg: 41,
            heaCapDmg: 20,
            heaCost: 31,
        }
    }, {
        name: 'Swoop',
        type: 5,
        element: 2,
        tiers: [3, 5],
        stats: {
            weight: 22,
            expDmg: [55, 90],
            heaDmg: 58,
            expResDmg: 5,
            eneCost: 31,
            heaCost: 31,
        }
    }, {
        name: 'Murmur',
        type: 5,
        element: 2,
        tiers: [3, 5],
        stats: {
            weight: 43,
            expDmg: [86, 153],
            heaDmg: 36,
            heaColDmg: 7,
            heaCost: 31,
        }
    }, {
        name: 'FlameWave',
        type: 5,
        element: 2,
        tiers: [3, 5],
        stats: {
            weight: 51,
            expDmg: [84, 154],
            heaDmg: 45,
            push: 1,
            heaCost: 31,
        }
    }, {
        name: 'HeatPoint',
        type: 5,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 51,
            expDmg: [161, 211],
            heaDmg: 48,
            expResDmg: 6,
            uses: 3,
            heaCost: 50,
        }
    }, {
        name: 'Fire Fly',
        type: 5,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 50,
            expDmg: [134, 242],
            heaDmg: 48,
            expResDmg: 5,
            range: [2, 4],
            heaCost: 50,
        }
    }, {
        name: 'Snack',
        type: 5,
        element: 3,
        tiers: [2, 5],
        stats: {
            weight: 30,
            eleDmg: [103, 135],
            eneDmg: 48,
            eleResDmg: 6,
            eneCost: 31,
        }
    }, {
        name: 'Torment',
        type: 5,
        element: 3,
        tiers: [2, 5],
        stats: {
            weight: 29,
            eleDmg: [97, 141],
            eneDmg: 48,
            eneCapDmg: 12,
            eneCost: 31,
        }
    }, {
        name: 'WindForge',
        type: 5,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 27,
            eleDmg: [55, 90],
            eneDmg: 76,
            eleResDmg: 5,
            eneCost: 31,
        }
    }, {
        name: 'Anguish',
        type: 5,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 30,
            eleDmg: [86, 153],
            eneDmg: 48,
            eneRegDmg: 7,
            eneCost: 31,
        }
    }, {
        name: 'Shockwave',
        type: 5,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 51,
            eleDmg: [139, 183],
            eneDmg: 49,
            push: 1,
            eneCost: 31,
        }
    }, {
        name: 'Face Shocker',
        type: 5,
        element: 3,
        tiers: [2, 5],
        stats: {
            weight: 41,
            eleDmg: [163, 213],
            eneDmg: 76,
            eleResDmg: 6,
            uses: 3,
            eneCost: 50,
        }
    }, {
        name: 'Electrolyte',
        type: 5,
        element: 3,
        tiers: [2, 5],
        stats: {
            weight: 47,
            eleDmg: [134, 244],
            eneDmg: 76,
            eleResDmg: 6,
            range: [2, 4],
            eneCost: 50,
        }
    }, {
        name: 'Rail Gun',
        type: 5,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 50,
            eleDmg: [151, 276],
            eneDmg: 86,
            eleResDmg: 7,
            range: [3, 6],
            eneCost: 50,
        }
    }, {
        name: 'Charge Engine',
        type: 6,
        element: 1,
        tiers: [2, 5],
        stats: {
            weight: 20,
            phyDmg: [132, 174],
            uses: 1,
        }
    }, {
        name: 'Advanced Teleporter',
        type: 7,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 11,
            eleDmg: [103, 135],
            eneDmg: 48,
            uses: 1,
            eneCost: 31,
        }
    }, {
        name: 'Double Teleporter',
        type: 7,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 26,
            uses: 2,
            eneCost: 20,
        }
    }, {
        name: 'Platinum Grappling Hook',
        type: 8,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 17,
            phyDmg: [143, 187],
            uses: 1,
        }
    }, {
        name: 'Flaming Grappling Hook',
        type: 8,
        element: 2,
        tiers: [3, 5],
        stats: {
            weight: 16,
            expDmg: [111, 145],
            heaDmg: 39,
            uses: 1,
            heaCost: 31,
        }
    }, {
        name: 'Shocking Grappling Hook',
        type: 8,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 11,
            eleDmg: [103, 135],
            eneDmg: 48,
            uses: 1,
            eneCost: 31,
        }
    }, {
        name: 'Platinum Plating',
        type: 9,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 40,
            health: 315,
        }
    }, {
        name: 'Iron Plating',
        type: 9,
        element: 1,
        tiers: [0, 1],
        stats: {
            weight: 40,
            health: 145,
        }
    }, {
        name: 'Mighty Protector',
        type: 9,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 28,
            phyRes: 59,
        }
    }, {
        name: 'Physical Protector',
        type: 9,
        element: 1,
        tiers: [0, 1],
        stats: {
            weight: 28,
            phyRes: 24,
        }
    }, {
        name: 'Heat Engine',
        type: 9,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 25,
            heaCap: 89,
            heaCol: 42,
        }
    }, {
        name: 'Cooling Mass Booster',
        type: 9,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 15,
            heaCol: 63,
        }
    }, {
        name: 'Heat Storage Unit',
        type: 9,
        element: 2,
        tiers: [3, 5],
        stats: {
            weight: 22,
            heaCap: 134,
        }
    }, {
        name: 'UltraHot Protector',
        type: 9,
        element: 2,
        tiers: [3, 5],
        stats: {
            weight: 28,
            expRes: 59,
        }
    }, {
        name: 'Heat Protector',
        type: 9,
        element: 2,
        tiers: [0, 5],
        stats: {
            weight: 28,
            expRes: 24,
        }
    }, {
        name: 'Energy Engine',
        type: 9,
        element: 3,
        tiers: [2, 5],
        stats: {
            weight: 25,
            eneCap: 89,
            eneReg: 42,
        }
    }, {
        name: 'Energy Mass Booster',
        type: 9,
        element: 3,
        tiers: [2, 5],
        stats: {
            weight: 15,
            eneReg: 63,
        }
    }, {
        name: 'Energy Storage Unit',
        type: 9,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 22,
            eneCap: 134,
        }
    }, {
        name: 'SuperCharge Protector',
        type: 9,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 28,
            eleRes: 59,
        }
    }, {
        name: 'Energy Protector',
        type: 9,
        element: 3,
        tiers: [0, 5],
        stats: {
            weight: 28,
            eleRes: 24,
        }
    }, {
        name: 'Maximum Protector',
        type: 9,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 51,
            phyRes: 39,
            expRes: 39,
            eleRes: 39,
        }
    }, {
        name: 'Savior Resistance',
        type: 9,
        element: 1,
        tiers: [0, 5],
        stats: {
            weight: 51,
            phyRes: 16,
            expRes: 16,
            eleRes: 16,
        }
    }, {
        name: 'Flame Spear',
        type: 5,
        element: 2,
        tiers: [3, 5],
        stats: {
            weight: 50,
            expDmg: [142, 259],
            heaDmg: 54,
            expResDmg: 7,
            range: [3, 6],
            heaCost: 50,
        }
    }, {
        name: 'Rusty Energy Armor',
        type: 1,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 370,
            health: 1664,
            eneCap: 267,
            eneReg: 96,
            heaCap: 193,
            heaCol: 64,
        },
        attachment: {
            leg1: { x:63, y:189 },
            leg2: { x:125, y:189 },
            side1: { x:60, y:148 },
            side2: { x:140, y:148 },
            side3: { x:54, y:80 },
            side4: { x:142, y:80 },
            top1: { x:53, y:24 },
            top2: { x:107, y:24 }
        }
    }, {
        name: 'Frantic Flame',
        svg: true,
        type: 4,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 50,
            expDmg: [76, 470],
            heaDmg: 78,
            expResDmg: 10,
            range: [3, 6],
            uses: 2,
            eneCost: 10,
            heaCost: 81,
        },
        attachment: { x:40, y:50 }
    }, {
        name: 'Frantic Lightning',
        svg: true,
        type: 4,
        element: 3,
        tiers: [2, 5],
        stats: {
            weight: 50,
            eleDmg: [76, 451],
            eneDmg: 95,
            eleResDmg: 10,
            range: [3, 6],
            uses: 2,
            eneCost: 81,
            heaCost: 13,
        },
        attachment: { x:40, y:50 }
    }, {
        name: 'Energy Free Armor',
        type: 1,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 335,
            health: 1343,
            eneCap: 25,
            eneReg: 8,
            heaCap: 223,
            heaCol: 80,
            phyRes: 24,
            expRes: 24,
            eleRes: 24,
        },
        attachment: {
            leg1: { x:83, y:175 },
            leg2: { x:145, y:175 },
            side1: { x:70, y:155 },
            side2: { x:150, y:155 },
            side3: { x:70, y:105 },
            side4: { x:150, y:105 },
            top1: { x:63, y:24 },
            top2: { x:147, y:24 }
        }
    }, {
        name: 'Rock Recoiler',
        type: 3,
        element: 1,
        tiers: [2, 5],
        stats: {
            weight: 65,
            phyDmg: [212, 423],
            phyResDmg: 10,
            push: 1,
            recoil: 1,
            range: [1, 2],
            uses: 3,
            eneCost: 25,
            heaCost: 38,
        },
        attachment: { x:63, y:35 }
    }, {
        name: 'Explosive Retreat',
        type: 3,
        element: 2,
        tiers: [3, 5],
        stats: {
            weight: 35,
            expDmg: [164, 337],
            expResDmg: 5,
            push: 1,
            retreat: 2,
            range: [3, 6],
            uses: 2,
            eneCost: 19,
            heaCost: 44,
            jumpReq: true,
        },
        attachment: { x:50, y:35 }
    }, {
        name: 'Evac Spark',
        svg: true,
        type: 3,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 37,
            eleDmg: [164, 337],
            eleResDmg: 5,
            push: 1,
            retreat: 2,
            range: [3, 6],
            uses: 2,
            eneCost: 44,
            heaCost: 19,
            jumpReq: true,
        },
        attachment: { x:50, y:35 }
    }, {
        name: 'Fractured Heat Armor',
        svg: true,
        width: 210,
        height: 197,
        type: 1,
        element: 2,
        tiers: [3, 5],
        stats: {
            weight: 370,
            health: 1664,
            eneCap: 193,
            eneReg: 64,
            heaCap: 267,
            heaCol: 96,
        },
        attachment: {
            leg1: { x:63, y:189 },
            leg2: { x:125, y:189 },
            side1: { x:60, y:148 },
            side2: { x:140, y:148 },
            side3: { x:54, y:80 },
            side4: { x:142, y:80 },
            top1: { x:53, y:24 },
            top2: { x:107, y:24 }
        }
    }, {
        name: 'Ejection Blast',
        svg: true,
        type: 3,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 34,
            phyDmg: [254, 434],
            phyResDmg: 5,
            push: 1,
            retreat: 2,
            range: [3, 6],
            uses: 2,
            eneCost: 31,
            heaCost: 31,
            jumpReq: true,
        },
        attachment: { x:46, y:38 }
    }, {
        name: 'Magma Recoiler',
        type: 3,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 64,
            expDmg: [173, 350],
            heaDmg: 50,
            expResDmg: 10,
            push: 1,
            recoil: 1,
            range: [1, 2],
            uses: 3,
            eneCost: 25,
            heaCost: 56,
        },
        attachment: { x:63, y:35 }
    }, {
        name: 'Party Crasher',
        svg: true,
        type: 4,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 43,
            eleDmg: [203, 347],
            eneDmg: 48,
            eleResDmg: 5,
            push: 1,
            advance: 3,
            range: [4, 8],
            uses: 2,
            heaCost: 100,
        },
        attachment: { x:63, y:35 }
    }, {
        name: 'Distance Shredder',
        type: 4,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 42,
            phyDmg: [228, 408],
            phyResDmg: 5,
            push: 1,
            advance: 3,
            range: [4, 8],
            uses: 2,
            heaCost: 100,
            jumpReq: true,
        },
        attachment: { x:63, y:35 }
    }, {
        name: 'Battery Armor',
        width: 222,
        height: 226,
        type: 1,
        element: 1,
        tiers: [2, 5],
        stats: {
            weight: 360,
            health: 1239,
            eneCap: 361,
            eneReg: 24,
            heaCap: 334,
            heaCol: 24,
            phyRes: 14,
            expRes: 14,
            eleRes: 14
        },
        divineBuff: {},
        attachment: {
            leg1:  { x:66,  y:190 },
            leg2:  { x:136, y:190 },
            side1: { x:66,  y:149 },
            side2: { x:142, y:149 },
            side3: { x:60,  y:97 },
            side4: { x:142, y:97 },
            top1:  { x:60,  y:51 },
            top2:  { x:131, y:51 }
        }
    }, {
        name: 'Flaming Battery Armor',
        width: 222,
        height: 226,
        type: 1,
        element: 2,
        tiers: [2, 5],
        stats: {
            weight: 346,
            health: 1136,
            eneCap: 313,
            eneReg: 24,
            heaCap: 401,
            heaCol: 24,
            phyRes: 14,
            expRes: 14,
            eleRes: 14
        },
        divineBuff: {},
        attachment: {
            leg1:  { x:66,  y:200 },
            leg2:  { x:136, y:200 },
            side1: { x:66,  y:149 },
            side2: { x:142, y:149 },
            side3: { x:60,  y:97 },
            side4: { x:142, y:97 },
            top1:  { x:60,  y:51 },
            top2:  { x:131, y:51 }
        }
    }, {
        name: 'Lightning Recoiler',
        width: 193,
        height: 76,
        type: 3,
        element: 3,
        tiers: [2, 5],
        stats: {
            weight: 69,
            eleDmg: [173, 350],
            eleResDmg: 10,
            push: 1,
            recoil: 1,
            range: [1, 2],
            uses: 3,
            eneCost: 56,
            heaCost: 25
        },
        attachment: { x:63, y:35 }
    }, {
        name: 'Shadow Wolf',
        svg: true,
        type: 3,
        element: 2,
        tiers: [3, 5],
        stats: {
            weight: 60,
            expDmg: [147, 376],
            heaDmg: 50,
            expResDmg: 10,
            range: [2, 4],
            push: 1,
            recoil: 1,
            uses: 3,
            eneCost: 25,
            heaCost: 56,
        },
        attachment: { x:40, y:50 }
    }, {
        name: 'Piercing Fox',
        svg: true,
        type: 3,
        element: 3,
        tiers: [3, 5],
        stats: {
            weight: 64,
            eleDmg: [147, 376],
            eneDmg: 67,
            eleResDmg: 10,
            range: [2, 4],
            push: 1,
            recoil: 1,
            uses: 3,
            eneCost: 56,
            heaCost: 25,
        },
        attachment: { x:40, y:50 }
    }, {
        name: 'Unstable Power Cell',
        svg: true,
        type: 3,
        element: 3,
        tiers: [2, 5],
        stats: {
            weight: 42,
            eleDmg: [144, 232],
            eneDmg: 246,
            eneCapDmg: 48,
            range: [1, 2],
            uses: 2,
            backFire: 152,
            eneCost: 19,
            heaCost: 31
        },
        divineBuff: {
            eleDmg: [153, 246],
            eneDmg: 260
        },
        attachment: { x:63, y:35 }
    }, {
        name: 'Cockpit Piercer',
        svg: true,
        type: 4,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 27,
            phyDmg: [540, 866],
            phyResDmg: 10,
            range: [7],
            push: 1,
            uses: 1,
            eneCost: 22,
            heaCost: 22,
        },
        attachment: { x:48, y:56 },
    }, {
        name: 'Sacrifice Cannon',
        svg: true,
        type: 3,
        element: 1,
        tiers: [2, 5],
        stats: {
            weight: 24,
            phyDmg: [209, 520],
            phyResDmg: 12,
            range: [2, 4],
            push: 1,
            uses: 1,
            backFire: 123,
            eneCost: 31,
            heaCost: 31,
        },
        divineBuff: { phyDmg:[214, 533] },
        attachment: { x:40, y:50 }
    }, {
        name: 'Perimeter Protector',
        svg: true,
        type: 3,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 31,
            phyDmg: [152, 273],
            phyResDmg: 5,
            range: [1, 2],
            retreat: 6,
            uses: 2,
            heaCost: 38,
            jumpReq: true,
        },
        attachment: { x:40, y:40 }
    }, {
        name: 'Dark Eagle',
        svg: true,
        type: 3,
        element: 1,
        tiers: [3, 5],
        stats: {
            weight: 60,
            phyDmg: [181, 456],
            phyResDmg: 10,
            range: [1, 2],
            push: 1,
            recoil: 2,
            uses: 3,
            eneCost: 25,
            heaCost: 38,
        },
        attachment: { x:40, y:40 }
    }, {
        name: 'Space Invader',
        svg: true,
        type: 4,
        element: 2,
        tiers: [3, 5],
        stats: {
            weight: 41,
            expDmg: [162, 289],
            heaDmg: 36,
            expResDmg: 5,
            range: [4, 8],
            push: 1,
            advance: 3,
            uses: 2,
            heaCost: 63,
            jumpReq: true,
        },
        attachment: { x:63, y:35 }
    }
];

workshop.init();