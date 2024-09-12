class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        let erro = null
        let recintosViaveis = []
        const animais = [
            {
                especie: 'LEAO',
                cadeiaAlimentar: 'predador',
                tamanho: 3,
                bioma: ['savana']
            },
            {
                especie: 'LEOPARDO',
                cadeiaAlimentar: 'predador',
                tamanho: 2,
                bioma: ['savana']
            },
            {
                especie: 'CROCODILO',
                cadeiaAlimentar: 'predador',
                tamanho: 3,
                bioma: ['rio']
            },
            {
                especie: 'MACACO',
                cadeiaAlimentar: 'presa',
                tamanho: 1,
                bioma: ['savana', 'floresta']
            },
            {
                especie: 'GAZELA',
                cadeiaAlimentar: 'presa',
                tamanho: 2,
                bioma: ['savana']
            },
            {
                especie: 'HIPOPOTAMO',
                cadeiaAlimentar: '',
                tamanho: 4,
                bioma: ['savana', 'rio']
            }
          ]
          
          const recintos = [
            {
                numero: 1,
                bioma: ['savana'],
                tamanhoTotal: 10,
                animaisExistentes: [
                    {
                        especie: 'MACACO',
                        quantidade: 3
                    }
                ]
            },
            {
                numero: 2,
                bioma: ['floresta'],
                tamanhoTotal: 5,
                animaisExistentes: [
                  {
                      especie: '',
                      quantidade: 0
                  }
                ]
            },
            {
                numero: 3,
                bioma: ['savana', 'rio'],
                tamanhoTotal: 7,
                animaisExistentes:[
                    {
                        especie: 'GAZELA',
                        quantidade: 1
                    }
                ]
            },
            {
                numero: 4,
                bioma: ['rio'],
                tamanhoTotal: 8,
                animaisExistentes: [
                  {
                      especie: '',
                      quantidade: 0
                  }
                ]
            },
            {
                numero: 5,
                bioma: ['savana'],
                tamanhoTotal: 9,
                animaisExistentes: [
                    {
                        especie: 'LEAO',
                        quantidade: 1
                    },
                ]
            }
          ]

        //checar se animal é válido
        const animalValido = animais.find(e => e.especie == animal)
        if(animalValido == undefined){
            erro = 'Animal inválido'
            return {erro}
        }

        //Checar se a quantidade adicionada é inválida
        if(quantidade <= 0){
            erro = 'Quantidade inválida'
            return {erro}
        }

        //Checar entrada de hipopotamos
        if(animalValido.especie == 'HIPOPOTAMO'){
            recintos.map(recinto => {
                //primeiro checar se recinto esta vazio
                if(recinto.animaisExistentes[0].quantidade == 0){
                    //checar espaço livre
                    /*if(recinto.tamanhoTotal < (quantidade * animalValido.tamanho)){
                        erro = 'Não há recinto viável'
                    }*/
                    //checar se é um ambiente confortável para o hipopotamo, ambiente vazio precisa achar pelo menos 1 ambiente em comum
                    let isComfy = false
                    recinto.bioma.map(ambienteRecinto => {
                        animalValido.bioma.map(ambienteAnimal => {
                            if(ambienteAnimal == ambienteRecinto) isComfy = true
                        })
                    })
                    if(isComfy){
                        let quantidadeOcupada = quantidade * animalValido.tamanho
                        if(quantidadeOcupada <= recinto.tamanhoTotal){
                            recintosViaveis.push('Recinto ' + recinto.numero + ' (espaço livre: ' + (recinto.tamanhoTotal - quantidadeOcupada) + ' total: ' + recinto.tamanhoTotal + ')')
                        }
                    }    
                }

                //checar se o animal no recinto é um hipopotamo
                if(recinto.animaisExistentes[0].especie == 'HIPOPOTAMO'){
                    //checar espaço livre
                    if(((recinto.animaisExistentes[0].quantidade * 4) + (quantidade * 4) <= recinto.tamanhoTotal)){
                        recintosViaveis.push('Recinto ' + recinto.numero + ' (espaço livre: ' + (recinto.tamanhoTotal - (recinto.animaisExistentes[0].quantidade * 4)) + ' total: ' + recinto.tamanhoTotal + ')')
                    }
                }

                //checar se é um ambiente confortável para o hipopotamo, amiente ocupado precisa achar os 2 ambientes em comum       
                if(recinto.animaisExistentes[0].quantidade > 0 && recinto.animaisExistentes[0].especie != 'HIPOPOTAMO'){
                    let animalOcupante = animais.find(e => e.especie == recinto.animaisExistentes[0].especie)
                    let quantidadeOcupada = animalOcupante.tamanho * recinto.animaisExistentes[0].quantidade
                    let cadeiaAnimalOcupante = animalOcupante.cadeiaAlimentar
                    //checando se o recinto possui os dois ambientes em comum e se o animal presente é carnivoro
                    if(cadeiaAnimalOcupante=='presa'){
                        let isComfy = 0
                        animalValido.bioma.map(ambiente => {
                            recinto.bioma.map(bioma => {
                                if(ambiente == bioma){
                                    isComfy++
                                }
                            })
                        })
                        if(isComfy == 2){
                            if((quantidadeOcupada + 1 + (quantidade * 4) <= recinto.tamanhoTotal)){
                                recintosViaveis.push('Recinto ' + recinto.numero + ' (espaço livre: ' + (((recinto.tamanhoTotal - 1) - (quantidadeOcupada + (quantidade * 4)))) + ' total: ' + recinto.tamanhoTotal + ')')
                            }
                        }
                    }  
                }
            })    
        }

        //Checar entrada de animais diferente de hipopotamo
        if(animalValido.especie != 'HIPOPOTAMO'){
            recintos.map(recinto => {
                //checar se o recinto esta vazio
                if(recinto.animaisExistentes[0].quantidade == 0){
                    //checar se o animal adicionado é um macaco e se a quantidade adicionada é igual a 1
                    switch (animalValido.especie == 'MACACO' && quantidade == 1){
                        case false:
                            let isSameBioma = false
                            recinto.bioma.map(ambiente => {
                                animalValido.bioma.map(ambienteAnimal => {
                                    if(ambiente == ambienteAnimal) isSameBioma = true
                                    
                                })
                            })
                            if(isSameBioma){
                                //verificar se a quantidade de animais adicionados cabe no recipiente
                                let tamanhoAnimal = animais.find(animal => animal.especie == animalValido.especie)
                                let quantidadeAdicionada = quantidade * tamanhoAnimal.tamanho
                                if(quantidadeAdicionada <= recinto.tamanhoTotal){
                                    recintosViaveis.push('Recinto ' + recinto.numero + ' (espaço livre: ' + (recinto.tamanhoTotal - quantidadeAdicionada) + ' total: ' + recinto.tamanhoTotal +')')
                                }
                            }

                        default:
                            break
                    }
                }
                
                //checar o ambiente ocupado pelo
                if(recinto.animaisExistentes.length == 1 && recinto.animaisExistentes[0].quantidade > 0){
                    //checar a quantidade de espaco ocupada no recinto e verificar se possui tamanho extra
                    let quantidadeOcupada = 0
                    let espaçoExtra = recinto.animaisExistentes[0].especie == animalValido.especie? 0 : 1
                    let animalAdicionado = animais.find(animal => animal.especie == animalValido.especie)
                    let animalPresente = animais.find(animal => animal.especie == recinto.animaisExistentes[0].especie)
                    let quantidadeAdicionada = quantidade * animalAdicionado.tamanho
                    quantidadeOcupada = quantidadeAdicionada + (animalPresente.tamanho * recinto.animaisExistentes[0].quantidade) + espaçoExtra

                    //checar se o bioma é compatível               
                    let isSameBioma = false
                    recinto.bioma.map(ambiente => {
                        animalValido.bioma.map(ambienteAnimal => {
                            if(ambiente == ambienteAnimal) isSameBioma = true
                        })
                    })
                    if(isSameBioma){
                        //Checar se o animal é carnivoro
                        //se o animal for predador, verificar se o animal presente no recinto é da mesma espécie
                        if(animalValido.cadeiaAlimentar == 'predador'){
                            if(animalPresente.especie == animalValido.especie){
                                //Checar se cabe dentro do recinto
                                if((quantidadeOcupada) <= recinto.tamanhoTotal){
                                    recintosViaveis.push('Recinto ' + recinto.numero + ' (espaço livre: ' + (recinto.tamanhoTotal - (quantidadeOcupada)) + ' total: ' + recinto.tamanhoTotal + ')')
                                }
                            }
                        }else{
                            //Como o animal aqui é presa, verificar se o animal que está no recinto é uma presa
                            switch(animalPresente.cadeiaAlimentar == 'predador'){
                                case false:
                                    //verificar se quantidade de animais adicionados cabe no recipiente
                                    if(quantidadeOcupada <= recinto.tamanhoTotal){
                                        recintosViaveis.push('Recinto ' + recinto.numero + ' (espaço livre: ' + (recinto.tamanhoTotal  - (quantidadeOcupada)) + ' total: ' + recinto.tamanhoTotal +')')
                                    }
                                    break

                                default:
                                    break                    
                            }
                        }
                    }
                }
            })
        }

        if(recintosViaveis.length == 0){
            erro = 'Não há recinto viável'
            return {erro}
        }

        return {recintosViaveis}
        
    }
    
}
export { RecintosZoo as RecintosZoo }