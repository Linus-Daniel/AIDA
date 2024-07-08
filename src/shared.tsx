import heart from './assets/services/heart.png'
import nose from './assets/services/nose1.png'
import food from './assets/services/food.png'
import virus from './assets/services/virus.png'
import build from './assets/services/build.png'
import fever from './assets/services/fever.png'
import joints from './assets/services/joints.png'
import lungs from './assets/services/lungs.png'
import kidney from './assets/services/kidney.png'
import tooth from './assets/services/tooth.png'
import fitness from './assets/services/fitness.png'


export const services = [
    {
        title:"Psychologist",
        image:food ,
    },
    {
        title:"Opthalmologist",
        image:lungs ,
    }, {
        title:"Dentist",
        image:tooth ,
    }, {
        title:"Cardiologist",
        image:heart  ,
    }, {
        title:"Nose specialist",
        image:nose ,
    }, {
        title:"Pulmonologist",
        image:lungs ,
    }, {
        title:"Heamostologist",
        image:kidney ,
    }, {
        title:"gestrologist",
        image:kidney ,
    }, {
        title:"Nephrologist",
        image:joints ,
    }, {
        title:"Viruiologist",
        image:virus,
    }, {
        title:"Covidologist",
        image:fitness ,
    }, {
        title:"Hivdologist ",
        image: build,
    }, {
        title:"Legologist",
        image:fever ,
    }, {
        title:"Handologist",
        image:joints ,
    }, {
        title:"sexologist",
        image:food ,
    },
]

console.log(services.length)