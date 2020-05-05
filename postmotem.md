### Approach and Process

1. What in my process and approach to this project would I do differently next time?

   1. I would start writing higher level functions assuming that they exist before writing the implementations. For example:

      ```javascript
      moveTheCar(){
          const [x,y] = getCurrentCarPosition()
          if (isXInBound(x) && !hasObsctables(x)) {
              updateCarLocation(x+=1)
          }
          ......
      }
      
      ```

   2. I did not commit as often as i should and i did not write meaningful commit messages. This is rather bad. It happened because i thought this was a personal project but nevertheless there shouldn't be any excuses.

2. What in my process and approach to this project went well that I would repeat next time?

   1. I did proper development cycle including ideation, wireframing , low-fi mockup , high-fi mockup design, code and test on different days.  
      1. The advantages are
         1. Eliminates the issue that I do not have to work on the implementation while doing the design at the same time , getting interrupted from time to time to rethink about how a certain UI interaction should behave, how should it look and how one component could impact another component in terms of technical logic.
         2. Gives me a feeling of getting something done as I went through stages of the cycle.
         3. Helps to create higher quality software
         4. With a visual design prototype,  it is easier to establish metrics for learning purpose. For example, before started coding, I could look at the design and give an estimate of how long it could take to write the code, and compare the estimates with the actual time i took. 
      2. The disadvantages are:
         1. Time consuming, having less time on actually coding 
         2. It is easy to create a design that couldn't be implemented within time limit.

   

   ### Code and Code Design

   ![](https://cdn-std.droplr.net/files/acc_601720/bX09jp)

   1. What in my code and program design in the project would I do differently next time?
      1. I would use custom hooks after i have learnt more about it, this is because i would like to keep each react component lean and short, so that it is less painful for the future me or other people to look at it.
   2. What in my code and program design in the project went well? Is there anything I would do the same next time?
      1. Lifting states up, have as much stateless components as possible. In this application, todoList component is the single source of truth. This makes state management easier as i do not have to worry about what happens when children states changes and what they could do to the parent component or their siblings. 

   

### WDI Unit 2 Post Mortem

1. What habits did I use during this unit that helped me?
   1. Make things work first before thinking about how to make things elegant.
2. What habits did I have during this unit that I can improve on?
   1. I was still too concerned about finding the best appropriate way of doing things rather than focusing on making things just work.
3. How is the overall level of the course during this unit? (instruction, course materials, etc.)
   1. Some assignments are too big of a scope (excluding furthers) e.g tweedr, tunr and should be given more time or reduce scope