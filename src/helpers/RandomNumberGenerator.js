import { FunctionalityHelpers } from "./FunctionalityHelpers"

export class RandomNumberGenerator extends FunctionalityHelpers{
    static NumberGenerator=(min,max,length)=>{
        let RandomNumberList=[]
        while (RandomNumberList.length<length){
            let randomNumber= Math.floor(Math.random() * max+ min)
            if(!RandomNumberList.includes(randomNumber)){
                RandomNumberList=[...RandomNumberList,randomNumber]
            }
        }
       
        return {random_numbers:RandomNumberList,possible_win_sequences: this.GetGeneratedNumberSucessSequences(RandomNumberList)}
    }
    
    static IndividualNumberGenerator=(min,max,existingList)=>{
        console.log(min,max,existingList)
        let RandomNumber=null
        while (true) {
            // Generate a random number in the desired range
            RandomNumber = Math.floor(Math.random() * max+ min)
    
            // If the random number is not in the existing list, break the loop
            if (!existingList.includes(RandomNumber)) {
                break;
            }
            
            console.log('Duplicate found, generating again...');
        }
        return RandomNumber
    }
}