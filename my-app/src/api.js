
const axios = require('axios')

function kebabCaseToCamel(str) {
      return str.replace( /(\-\w)/g, (matches) => matches[1].toUpperCase())
  }

class API {
  constructor({ url }){
    this.url = 'https://breaktime-games.herokuapp.com'
    this.endpoints = {}
  }
  /**
   * Create and store a single entity's endpoints
   * @param {A entity Object} entity
   */
  createEntity(entity) {
    /**
     * If there is a - in the entity.name, then change it 
     * to camelCase. E.g 
     * ```
     * myApi.createEntity({ name : 'foo-bar'})
     * myApi.endpoints.fooBar.getAll(...)
     */

    const name = kebabCaseToCamel(entity.name)
    this.endpoints[name] = this.createBasicCRUDEndpoints(entity)
  }

  createEntities(arrayOfEntity) {
    arrayOfEntity.forEach(this.createEntity.bind(this))
  }

  /**
   * Create the basic endpoints handlers for CRUD operations
   * @param {A entity Object} entity
   */
  createBasicCRUDEndpoints( { name } ) {
    var endpoints = {}

    const resourceURL = `${this.url}`

    endpoints.create_game = ({game}, config={}) => axios.post(`${resourceURL}/${game}/create`, config)

    endpoints.get_data = ({game}, config={}) => axios.get(`${resourceURL}/${game}/get_data`, config)

    endpoints.make_turn = ({game}, {position}, config={}) => axios.put(`${resourceURL}/${game}/${position}/make_turn`, config)

    endpoints.delete = ({game}, config={}) => axios.delete(`${resourceURL}/${game}/delete`, config);
    //endpoints.getAll = ({ params={}}, config={} ) => axios.get(resourceURL, { params }, config)
    //endpoints.getOne = ({ id }, config={}) =>  axios.get(`${resourceURL}/${id}`, config)
    //endpoints.create = (toCreate, config={}) =>  axios.post(resourceURL, toCreate, config)
    //endpoints.update = (toUpdate, config={}) => axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate, config)
    //endpoints.patch  = ({id}, toPatch, config={}) => axios.patch(`${resourceURL}/${id}`, toPatch, config)
    //endpoints.delete = ({ id }, config={}) => axios.delete(`${resourceURL}/${id}`, config)
    return endpoints

  }

}

export default API