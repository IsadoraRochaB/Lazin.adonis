
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animais from 'App/Models/Animais'
import StoreAnimaiValidator from 'App/Validators/StoreAnimaisValidator'

export default class AnimaisController {
  public async index({}: HttpContextContract) {
    const animaisDB = await Animais.all()
    return animaisDB
    
  }

  public async store({request, auth}: HttpContextContract) {
    const data = await request.validate(StoreAnimaiValidator)
    const animaisDB = await Animais.create ({...data, userId: auth.user?.id})
    return animaisDB
 

  }

  public async show({params, response}: HttpContextContract) {
    try {
      const animaisDB = await Animais.findOrFail (params.id)
      return animaisDB
    } catch (error) {
      response.status(400).send("Animal não encontrado")
      
    }
  }

  public async update({request, params, response}: HttpContextContract) {
    const {numero_animal} = await request.validate(StoreAnimaiValidator)
    try {
      const animaisDB = await Animais.findOrFail(params.id)
      
      animaisDB.numero_animal = numero_animal
      await animaisDB.save
      return animaisDB
    } catch (error) {
      response.status(400).send("Animal não encontrado")
      
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try {
      const animaisDB = await Animais.findOrFail (params.id)
      await animaisDB.delete()
      return animaisDB 
    } catch (error) {
      response.status(400).send("Animal não encontrado")
      
    }
  }
}
