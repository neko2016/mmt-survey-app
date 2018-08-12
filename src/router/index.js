import Vue from 'vue'
import Router from 'vue-router'
import survey from '@/components/survey.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'survey',
      component: survey
    }
  ]
})
