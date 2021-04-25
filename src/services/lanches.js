import { http } from './config'

export default	{

	salvar:(lanche)=>{
		return http.post('lanche',lanche);
  },
    
	atualizar:(lanche)=>{
		return http.put('lanche',lanche);
  },

  listar:()=>{
		return http.get('lanches')
  },
    
	apagar:(lanche)=>{
		return http.delete('lanche', { data: lanche })
	}
}