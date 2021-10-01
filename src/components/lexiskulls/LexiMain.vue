<template>
<div id="lexi-main-container" class="d-flex flex-column align-center">
    <div class="header">
        <img src="../../assets/lexiskullslogo.png" />
    </div>
    <div class="d-flex lexi-nav justify-space-between">
        <span class="nav-item">About</span>
        <span class="nav-item">Gallery</span>
        <span class="nav-item">Team</span>
        <span class="nav-item">The gRAVEyard (coming soon!)</span>
    </div>
    <fog />
    <div class="d-flex justify-center align-center" style="height:350px">
        <img class="floating" height="60%" src="../../assets/1-2.png" />
        <img class="floating" height="60%" src="../../assets/1-1.png" />
        <img class="floating" height="60%" src="../../assets/1-3.png" />
        <img class="floating" height="60%" src="../../assets/1-4.png" />
    </div>
    <div id="about">
        <h2 class="mb-10">ABOUT</h2>
        <p>lex·i·con - A wordbook or dictionary</p>
        <p>skull - the inside-your-head meat helmet</p>
        <p>Lexiskulls are a collection of 10,000 cute, deranged, misguided skulls that love words even if the language parts of their brains rotted a long time ago. Each skull is randomly generated from a bank of:
            <ul>
                <li>12 backgrounds, including 2 rare, one super rare, and one ultra rare</li>
                <li>32 skulls, inlcuding 11 rare, 3 super rare, and one ultra rare</li>
                <li>26 eyes, including 11 rare, 4 super rare, and one ultra-rare</li>
                <li>15 hats, including 6 rare, 2 super rare, and one ultra-rare</li>
                <li>9 moustaches, 7 of which are rare, one super rare, and one ultra-rare</li>
                <li>And then there's the wordbank... a monster collection of 420 words (nice), including 96 rare, 45 super rare and 1 ultra rare</li>
            </ul>
        </p>
        <p>
            <h3>Everyone Dies Equally</h3>
            <p>Lexiskulls will be fairly priced all at 25 MATIC. No tiers, no curves, no weirdness. Just fair.</p>
            <p>100 Lexiskulls will be reserved for team, giveaways, and contests. The most rare of the rare, a 100% ultra-rare skull, will be given as a prize in a treasure hunt launching October 31st. In order to get access to the hunt, you'll need a skull in your wallet to gain access to The gRAVEyard. What is The gRAVEyard you ask?
        </p>
        <p>
            <h3>The gRAVEyard</h3>
            <p>The gRAVEyard is a members-only area accessible only by holding at least one Lexiskull in your wallet. The gRAVEyard is a place to let your skull relax and let whatever is left of their hair down. It also grants you safe passage to members-only benefits as they release, and early access to the next spin-off project, Swearyskulls.
        </p>
    </div>
    <div id="team">
        <h2 class="mb-10">TEAM</h2>
        <p>Crypto Jesus - </p>
        <p>Tracy - </p>
        <p>Crypto House - </p>
    </div>
</div>
</template>
<script>
import Fog from './Fog.vue'

export default {
    name: 'LexiMain',
    components: { Fog },
}
</script>
<style lang="scss" scoped>
#lexi-main-container {
    background-color:black;
    height:100%;
    .lexi-nav {
        width:50%;
        max-width: 50%;
        color:white;
        .nav-item {
            font-family: 'Gluten', sand-serif;
            font-size: 18px;
        }
    }
    #about, #team {
        width: 80%;
        padding: 20px 50px;
        color: white;
    }
    // #about {
    //     margin-top:400px;
    // }
}
.floating { 
    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-left: 30px;
    margin-top: 5px;
}
 
@keyframes floating {
    0% { transform: translate(0,  0px); }
    50%  { transform: translate(0, 15px); }
    100%   { transform: translate(0, -0px); }   
}
</style>