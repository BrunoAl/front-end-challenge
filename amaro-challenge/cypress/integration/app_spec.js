describe('Load app', () => {
  it ('Visit web app', () => {
    cy.visit('http://localhost:3000')
  })
})

describe('Buy some products', () => {

  it ('Tratar tentativa de comprar um produto sem selecionar um tamanho', () => {
    const productCard = cy.contains('TOP CROPPED SUEDE').parent()
    productCard.within(() => {
      cy.contains('ADD TO CART').click()
      cy.contains('Por favor, selecione um tamanho')
    })
    
    cy.get('#cart').contains('0') // não deve ser adicionado ao carrinho

  })

  it ('Comprar 3 VESTIDO TRANSPASSE BOW tamanho M', () => {
    const productCard = cy.contains('VESTIDO TRANSPASSE BOW').parent()
    productCard.within(() => {
      cy.get('span').contains('M').click()
      cy.get('span').contains('ADD TO CART').click()
      cy.get('span').contains('ADD TO CART').click()
      cy.get('span').contains('ADD TO CART').click()
    })
    cy.get('#cart').contains('1').click()   

  })
  
  it ('Checar produtos no carrinho (3 VESTIDOS TRANSPASSE BOW tamanho M)', () => {
    const product1Row = cy.contains('VESTIDO TRANSPASSE BOW').parent().parent()
    product1Row.within(() => {
      cy.contains('tam: M')
      cy.get('input').should('have.value', '3')
    })
    cy.contains('Total price: R$ 599,70')

  })

  it ('Aumentar a quantidade do produto de 3 para 5', () => {
    cy.get('#plus').click()
    cy.get('#plus').click()
    cy.contains('Total price: R$ 999,50')
  })

  it ('Diminuir a quantidade do produto de 5 para 2', () => {
    cy.get('#minus').click()
    cy.get('#minus').click()
    cy.get('#minus').click()
    cy.contains('Total price: R$ 399,80')
  })

  it ('Deletar todos os VESTIDO TRANSPASSE BOW tamanho M', () => {
    cy.get('#trash').click()
    cy.contains('Total price: R$ 0,00')
  })

  it ('Ir para o catálogo', () => {
    cy.get('#catalog').click()
  })
    
})

describe('Buy more products', () => {
  it ('Comprar uma CAMISA SUEDE SPAN tamanho P', () => {
    const productCard = cy.contains('CAMISA SUEDE SPAN').parent()
    productCard.within(() => {
      cy.get('span').contains('P').click()
      cy.get('span').contains('ADD TO CART').click()
    })
    cy.get('#cart').contains('1')

  })

  it ('Comprar uma CALÇA CLASSIC PRINT tamanho 36', () => {
    const productCard = cy.contains('CALÇA CLASSIC PRINT').parent()
    productCard.within(() => {
      cy.get('span').contains('36').click()
      cy.get('span').contains('ADD TO CART').click()
    })
    cy.get('#cart').contains('2')
  })


  it ('Comprar um MACAQUINHO ALFAIATARIA PEACE tamanho M', () => {
    const productCard = cy.contains('MACAQUINHO ALFAIATARIA PEACE').parent()
    productCard.within(() => {
      cy.get('span').contains('M').click()
      cy.get('span').contains('ADD TO CART').click()
    })
    cy.get('#cart').contains('3')
  })

  it ('Ir para o carrinho', () => {
    cy.get('#cart').click()
  })

  it ('checar se há os 3 produtos adicionados (quantidade / valor / tamanho)', () => {
    const product1 = cy.contains('CAMISA SUEDE SPAN').parent().parent()
    product1.within(() => {
      cy.get('input').should('have.value', '1')
      cy.contains('R$ 189,90')
      cy.contains('tam: P')
    })
    const product2 = cy.contains('CALÇA CLASSIC PRINT').parent().parent()
    product2.within(() => {
      cy.get('input').should('have.value', '1')
      cy.contains('R$ 159,90')
      cy.contains('tam: 36')
    })
    const product3 = cy.contains('MACAQUINHO ALFAIATARIA PEACE').parent().parent()
    product1.within(() => {
      cy.get('input').should('have.value', '1')
      cy.contains('R$ 149,90')
      cy.contains('tam: M')
    })

    cy.contains('Total price: R$ 499,70')
  })
})
