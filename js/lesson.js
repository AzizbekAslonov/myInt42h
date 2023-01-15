const lessonContainer = document.getElementById('canvas-container')

const CONFIG = {
   canvasHeight: 900,
   circleDiametr: 60,
   offsetRight: 120,
   offsetBottom: 30,
   weightRectW: 40,
   weightRectH: 20,
   neurons: {
      input: [
         { weight: 2.1, value: 10, reference: { neuronIds: [1] } },
         { weight: 2, value: 10, reference: { neuronIds: [1] } },
         { weight: 2.1, value: 10, reference: { neuronIds: [2] } },
         { weight: 2, value: 10, reference: { neuronIds: [2] } },
      ],
      hidden: [
         { weight: 2, value: 10, reference: { neuronIds: [1] } },
         { weight: 2, value: 10, reference: { neuronIds: [1] } },
      ],
      output: [
         { weights: [0.5, 1, -0.2] },
      ]
   }
}

let sketch = function (p) {
   p.setup = function () {
      // canvas view config
      p.createCanvas(lessonContainer.clientWidth, CONFIG.canvasHeight)
      p.textSize(18)
      p.textAlign(p.CENTER)
      p.strokeWeight(1.5)
      // canvas data config
      const { neurons, offsetRight, offsetBottom, circleDiametr } = CONFIG

      const maxHeight = findMaxHeight(
         neurons.input.length, neurons.hidden.length, neurons.output.length,
         circleDiametr, offsetBottom
      )
      const inputsHeight = neurons.input.length * circleDiametr + (neurons.input.length - 1) * offsetBottom
      const hiddensHeight = neurons.hidden.length * circleDiametr + (neurons.hidden.length - 1) * offsetBottom
      const outputsHeight = neurons.output.length * circleDiametr + (neurons.output.length - 1) * offsetBottom

      // drawing inputs==================================================================
      p.translate(0, (maxHeight - inputsHeight) / 2)
      for (let i = 1; i <= neurons.input.length; i++) {
         const circleX = circleDiametr / 2
         const circleY = (i + i - 1) * (circleDiametr / 2) + (i - 1) * offsetBottom
         const neuron = neurons.input[i - 1]

         // neuron-reference line
         if (neuron.reference) {
            const { weightRectW, weightRectH } = CONFIG
            neuron.reference.neuronIds.forEach(neuronId => {
               const refneuronX = 3 * (circleDiametr / 2) + offsetRight
               let refNeuronY = (neuronId + neuronId - 1) * (circleDiametr / 2) +
                  (neuronId - 1) * offsetBottom - (maxHeight - inputsHeight) / 2

               if (neurons.hidden && neurons.hidden.length > 0) {
                  refNeuronY += (maxHeight - hiddensHeight) / 2
               } else {
                  refNeuronY += (maxHeight - outputsHeight) / 2
               }

               p.stroke('red')
               p.strokeWeight(1.5)
               p.line(circleX, circleY, refneuronX, refNeuronY)

               // =======
               // p.strokeWeight(2)
               // p.stroke('yellow')
               // p.line(
               //    circleX,
               //    circleY,
               //    refneuronX,
               //    (neuronId + neuronId - 1) * (circleDiametr / 2) + (neuronId - 1) * offsetBottom - (maxHeight - inputsHeight) / 2
               // )
               // p.stroke('blue')
               // p.line(
               //    circleX,
               //    circleY,
               //    refneuronX,
               //    refNeuronY
               // )

               // burchak hisob kitobi
               let realY = (neuronId + neuronId - 1) * (circleDiametr / 2) + (neuronId - 1) * offsetBottom - (maxHeight - inputsHeight) / 2

               let a = Math.sqrt(Math.pow(realY - refNeuronY, 2))
               let c = Math.sqrt(Math.pow(circleX - refneuronX, 2) + Math.pow(circleY - refNeuronY, 2))
               let angle = Math.asin(a / c) //radian -> gradus 180/PI
               console.log(angle * 180 / Math.PI)
               // =======

               p.fill(255)
               p.stroke(0)
               let rectX = circleDiametr + offsetRight / 2 - weightRectW / 2
               let rectY = (circleY + (neuronId + neuronId - 1) * (circleDiametr / 2) + (neuronId - 1) * offsetBottom
                  + (maxHeight - hiddensHeight) / 2 - (maxHeight - inputsHeight) / 2) / 2
                  - weightRectH / 2

               // !!! weight un kvadrat
               // p.rect(
               //    rectX - Math.cos(angle) * 0,
               //    rectY - Math.sin(angle) * 0,
               //    weightRectW,
               //    weightRectH
               // )

               // p.noStroke()
               // p.fill(0)
               // p.text(
               //    'w=' + neuron.weight,
               //    circleDiametr + offsetRight / 2,
               //    (circleY + (neuronId + neuronId - 1) * (circleDiametr / 2) + (neuronId - 1) * offsetBottom +
               //       (maxHeight - hiddensHeight) / 2 - (maxHeight - inputsHeight) / 2) /
               //    2 + weightRectH / 2 - 2
               // )
            })

            // p.push()
            // let angle1 = p.radians(45)
            // p.rotate(angle1)
            // p.text("45 DEGREES", 0, 0)
            // p.line(0, 0, 150, 0)
            // p.pop()
         }

         // neuron circle
         p.noStroke()
         p.fill(200)
         p.circle(circleX, circleY, circleDiametr)

         // draw input value
         p.fill(0)
         p.text(neuron.value, circleDiametr / 2, circleY + 5)
      }

      // drawing hiddens==================================================================
      if (neurons.hidden && neurons.hidden.length > 0) {
         p.translate(circleDiametr + offsetRight, (maxHeight - hiddensHeight) / 2 - (maxHeight - inputsHeight) / 2)
         for (let i = 1; i <= neurons.hidden.length; i++) {
            const circleX = circleDiametr / 2
            const circleY = (i + i - 1) * (circleDiametr / 2) + (i - 1) * offsetBottom
            const neuron = neurons.hidden[i - 1]

            // neuron-reference line
            if (neuron.reference) {
               const { weightRectW, weightRectH } = CONFIG
               neuron.reference.neuronIds.forEach(neuronId => {
                  const refneuronX = 3 * (circleDiametr / 2) + offsetRight
                  let refNeuronY = (neuronId + neuronId - 1) * (circleDiametr / 2) + (neuronId - 1) * offsetBottom
                     - (maxHeight - hiddensHeight) / 2 + (maxHeight - outputsHeight) / 2

                  p.stroke('red')
                  p.strokeWeight(1.5)
                  p.line(circleDiametr / 2, circleY, refneuronX, refNeuronY)

                  // !!! weight un kvadrat
                  // p.fill(255)
                  // p.stroke(0)
                  // p.rect(
                  //    circleDiametr + offsetRight / 2 - weightRectW / 2,
                  //    (circleY + (neuronId + neuronId - 1) * (circleDiametr / 2) + (neuronId - 1) * offsetBottom +
                  //       (maxHeight - outputsHeight) / 2 - (maxHeight - hiddensHeight) / 2)
                  //    / 2 - weightRectH / 2,
                  //    weightRectW,
                  //    weightRectH
                  // )

                  // p.noStroke()
                  // p.fill(0)
                  // p.text(
                  //    'w=' + neuron.weight,
                  //    circleDiametr + offsetRight / 2,
                  //    (circleY + (neuronId + neuronId - 1) * (circleDiametr / 2) + (neuronId - 1) * offsetBottom +
                  //       (maxHeight - outputsHeight) / 2 - (maxHeight - hiddensHeight) / 2) /
                  //    2 + weightRectH / 2 - 2
                  // )
                  // weight un kvadrat
               })
            }

            // neuron circle
            p.noStroke()
            p.fill(200)
            p.circle(circleX, circleY, circleDiametr)
         }
      }

      // drawing outputs==================================================================
      if (neurons.hidden && neurons.hidden.length > 0) {
         p.translate(
            circleDiametr + offsetRight,
            (maxHeight - outputsHeight) / 2 - (maxHeight - hiddensHeight) / 2
         )
      } else {
         p.translate(
            circleDiametr + offsetRight,
            (maxHeight - outputsHeight) / 2
         )
      }
      for (let i = 1; i <= neurons.output.length; i++) {
         const circleX = circleDiametr / 2
         const circleY = (i + i - 1) * (circleDiametr / 2) + (i - 1) * offsetBottom
         const neuron = neurons.output[i - 1]

         // neuron circle
         p.noStroke()
         p.fill(200)
         p.circle(circleX, circleY, circleDiametr)
      }
   }

   p.draw = function () {

   }

   function findMaxHeight(a, b, c, diametr, offset) {
      let max = a
      if (b > max) max = b
      if (c > max) max = c

      return max * diametr + (max - 1) * offset
   }
}

new p5(sketch, lessonContainer)