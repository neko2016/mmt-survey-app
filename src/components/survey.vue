<template>
  <div id="quiz">
    <div v-if="introStage">
      <h1>Welcome to the Quiz: {{title}}</h1>
      <p>Some kind of text here. Blah blah.</p>
      <button @click="startQuiz">START!</button>
    </div>

    <!-- v-bind:childProps='parentProps' -->
    <div v-if="questionStage">
      <question
        v-bind:question="questions[currentQuestion]"
        v-bind:question-number="currentQuestion+1"
        v-on:answer="handleAnswer"
      ></question>
    </div>

    <div v-if="resultsStage">
      You got {{correct}} right out of {{questions.length}} questions. Your percentage is {{perc}}%.
    </div>
</div>
</template>

<script>
// import quizData from './data.json'
import qs from './question.vue'
const quizData = 'https://api.myjson.com/bins/ahn1p'

export default {
  name: 'survey',
  data () {
    return {
      introStage: false,
      questionStage: false,
      resultsStage: false,
      title: '',
      questions: [],
      currentQuestion: 0,
      answers: [],
      correct: 0,
      perc: null
    }
  },
  components: {
    'question': qs
  },
  mounted () {
    fetch(quizData)
      .then(res => res.json())
      .then(res => {
        this.title = res.title
        this.questions = res.questions
        this.introStage = true
      })
  },
  methods: {
    startQuiz () {
      this.introStage = false
      this.questionStage = true
      console.log('test' + JSON.stringify(this.questions[this.currentQuestion]))
    },
    handleAnswer (e) {
      console.log('answer event ftw', e.answer)
      // console.log('rcv', this.answers)
      this.answers[this.currentQuestion] = e.answer
      if ((this.currentQuestion + 1) === this.questions.length) {
        this.handleResults()
        this.questionStage = false
        this.resultsStage = true
      } else {
        this.currentQuestion++
      }
    },
    handleResults () {
      // console.log('handle results', this.answers)
      this.questions.forEach((a, index) => {
        if (this.answers[index] === a.answer) {
          this.correct++
        }
      })
      this.perc = ((this.correct / this.questions.length) * 100).toFixed(2)
      console.log(this.correct + ' ' + this.perc)
      // send data to server
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
