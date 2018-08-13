<template>
  <div id="quiz">
    <div v-if="introStage">
      <h1>{{title}}</h1>
      <p>This survey contains 10 sections. You will be presented with 2 sound clips in each section.</p>
      <p>Hover over the button to listen to the sound clip.</p>
      <p>Click the button to choose the one that you prefer.</p>
      <button id="startBtn" @click="startQuiz">START!</button>
    </div>

    <!-- v-bind:childProps='parentProps' -->
    <div v-if="questionStage">
      <single-question
        v-bind:question="questions[currentQuestion]"
        v-bind:question-number="currentQuestion+1"
        v-on:answer="handleAnswer"
      ></single-question>
    </div>

    <div v-if="resultsStage">
      <p>You have submitted {{this.answers}} </p>
      <p>Thank you for participating the survey.</p>
    </div>
</div>
</template>

<script>
import data from './data.json'
import qs from './question.vue'

export default {
  name: 'survey',
  data () {
    return {
      title: data.title,
      questions: data.questions,
      introStage: false,
      questionStage: false,
      resultsStage: false,
      currentQuestion: 0,
      answers: []
    }
  },
  components: {
    'single-question': qs
  },
  mounted () {
    this.introStage = true
  },
  methods: {
    startQuiz () {
      this.introStage = false
      this.questionStage = true
    },
    handleAnswer (e) {
      // picking up data from child component
      this.answers[this.currentQuestion] = e.answer
      // when reaching the end of the survey
      if (this.currentQuestion === this.questions.length - 1) {
        this.handleResults()
        this.questionStage = false
        this.resultsStage = true
      } else {
        this.currentQuestion++
      }
    },
    handleResults () {
      console.log('results', this.answers)
      // TODO: send data to server
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#startBtn{
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
