import { Dimensions,Platform,StatusBar} from 'react-native'
const DevHeight = Dimensions.get('window').height
const DevWidth = Dimensions.get('window').width
const StbrHeight=StatusBar.currentHeight
const setHeight=()=>{
        if( Platform.Version > 25){
                return DevHeight
                }else return DevHeight-StbrHeight
        }
export default{
  daySet1:['Sun','Mon','Tue','Wed','Thu'],
  daySet2:['Mon','Tue','Wed','Thu','Fri'],
  daySet3:['Tue','Wed','Thu','Fri','Sat'],
  daySet4:['Wed','Thu','Fri','Sat','Sun'],
  daySet5:['Thu','Fri','Sat','Sun','Mon'],
  daySet6:['Fri','Sat','Sun','Mon','Tue'],
  daySet7:['Sat','Sun','Mon','Tue','Wed'],

  timeset:['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','1:00','1:30','2:00','2:30','3:00','3:30','4:00','4:30','5:00','5:30'],
  hourSet:['8','9','10','11','12','1','2','3','4','5'],
  minutSet:['00','05','10','15','20','25','30','35','40','45','50','55'],
           
  cities:[{label: 'UK', value: 'uk'},           //Dummy cities for tesing        
          {label: 'France', value: 'france'}],

  branches:[{label: 'Branc1', value: 'uk'},     //Dummy branches for tesing
          {label: 'Branc2', value: 'france'},
          {label: 'Branc3', value: 'france'}],

  DevHeight:Platform.OS === 'ios' ? DevHeight : setHeight()  // taking device height based platform version
}