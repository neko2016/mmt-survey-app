<template>
  <div>
    <h1 class="section-title">Question {{ questionNumber }}: {{ question.text }} </h1>

      <!-- <div class="sound-tracks"> -->
        <!-- <label class="sound-clip" @click.prevent="playSound(question.tracks.A)"> -->
        <!-- <label class="sound-clip" @mouseover="playSound(question.tracks.A)" @mouseleave="stopSound()">
          <span>Clip A</span>
        </label> -->

        <!-- <label class="sound-clip" @click.prevent="playSound(question.tracks.B)"> -->
        <!-- <label class="sound-clip" @mouseover="playSound(question.tracks.B)" @mouseleave="stopSound()">
          <span>Clip B</span>
        </label> -->
      <!-- </div> -->

      <div class="user-options">
        <div v-for="(choice,index) in question.options" v-bind:key='choice.id' class="option-wrapper">
          <!-- <label :for="'opt-'+index" class="option-label" :class="{active: answer === choice}">-->
          <!-- autoplay when hovering over the buttons -->
          <label :for="'opt-'+index"
          class="option-label" :class="{active: answer === choice}"
          @mouseover.prevent="playSound(question.tracks[choice])"
          @mouseleave.prevent="stopSound()"
          >
            <input type="radio" :id="'opt-'+index" name="currentQuestion" v-model="answer" :value="choice" class="option-value">
            <span>{{choice}}</span>
          </label>
        </div>
      </div>

      <!-- <div class="user-options">
        <div class="option-wrapper">
          <label for="opt-0" class="option-label" :class="{active: answer === 'A'}">
             <input id="opt-0" type="radio" name="currentQuestion" class="option-value" value="A" v-model="answer">
             <span>A</span>
          </label>
        </div>

        <div class="option-wrapper">
          <label for="opt-1" class="option-label"  :class="{active: answer === 'B'}">
             <input id="opt-1" type="radio" name="currentQuestion" class="option-value" value="B" v-model="answer">
             <span>B</span>
          </label>
        </div>

        <div class="option-wrapper">
          <label for="opt-2" class="option-label"   :class="{active: answer === 'No difference'}">
             <input id="opt-2" type="radio" name="currentQuestion" class="option-value" value="No difference" v-model="answer">
             <span>No difference</span>
          </label>
        </div>
      </div> -->

      <button @click="submitAnswer" id="nextBtn">Next</button>

  </div>
</template>

<script>
export default {
  name: 'question',
  data () {
    return {
      answer: null,
      clip: null
    }
  },
  // receive data passed from parent, array or obejct
  props: [ 'question', 'questionNumber' ],
  // autoplay with BUGS
  // mounted () {
  //   this.playSound(this.question.tracks.B)
  // },
  methods: {
    playSound: function (url) {
      if (url && this.clip === null) {
        this.clip = new Audio(url)
        this.clip.play()
      }
    },
    stopSound: function () {
      if (this.clip !== null) {
        this.clip.pause()
        this.clip = null
      }
    },
    submitAnswer: function () {
      if (this.answer !== null) {
        this.$emit('answer', {answer: this.answer})
        this.answer = null
      } else {
        alert('Please select your preference.')
      }
    }
  }
}
</script>

<style>
.section-title {
  font-size: 32px;
}

.sound-tracks {
  display: flex;
  justify-content: center;
}
.sound-clip{
  background: darkcyan;
  color: white;
  border-radius: 50%;
  margin: 20px;
  width: 100px;
  height: 100px;
}
.sound-clip span {
  display: block;
  line-height: 18px;
  font-size: 18px;
  margin-top: 40px;
}

.user-options {
  display: flex;
  justify-content: center;
}

.option-label {
  border-radius: 5px;
  border: 2px solid salmon;
  display: block;
  width: 200px;
  height: 70px;
  margin: 20px;
  cursor: pointer;
  margin-top: 50px;
  font-size: 18px;
}

label:hover{
  border: 2px solid #ffbca1;
  background: #ffbca1;
  color: white;
}

.option-label.active {
  background: salmon;
  border: 2px solid salmon;
  color: white;
}

.option-label span {
  display:block;
  height: 100%;
  padding-top: 25px;
}

.option-value {
  display: none;
}

#nextBtn{
  display: block;
  border: none;
  border-radius: 3px;
  background: darkcyan;
  color: white;
  width: 200px;
  height: 70px;
  margin: 20px auto;
  margin-top: 80px;
  cursor: pointer;
  font-size: 18px;
}
</style>
