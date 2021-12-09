import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cadastro from 'App/Models/Cadastro'
import StoreCadastroValidator from 'App/Validators/StoreCadastroValidator'

export default class CadastrosController {
  public async index({}: HttpContextContract) {
    const projetoDB = await Cadastro.all()
    return projetoDB
  }

  public async store({request, auth}: HttpContextContract) {
    const data = await request.validate(StoreCadastroValidator) 
    const projetoDB = await Cadastro.create({...data, userId: auth.user?.id })
    return projetoDB

  }

  public async show({params, response}: HttpContextContract) {
    try {
      const projetoDB = await Cadastro.findOrFail(params.id)
      return projetoDB
    } catch (error) {
      response.status(400).send("Esse cadastro não foi encontrado. Tente novamente!")
      
    }
  }

  public async update({request, params, response}: HttpContextContract) {
    try {
      const projetoDB = await Cadastro.findOrFail(params.id)
      const data = await request.validate(StoreCadastroValidator) 
      projetoDB.nome = data.nome
      await projetoDB.save()
      return projetoDB

    } catch (error) {
      response.status(400).send("Esse cadastro não foi encontrado. Tente novamente!")
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try {
      const projetoDB = await Cadastro.findOrFail(params.id)
      await projetoDB.delete()
      return projetoDB

    } catch (error) {
      response.status(400).send("Esse cadastro não foi encontrado. Tente novamente!")
      
    }
  }
}
