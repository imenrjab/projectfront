export interface EmployeSociete {

	id: number
	nom: string;
	prenom: string;
	matrecule: number;
	fonction: Fonction;
	degre: string;
	password: string;
	tele: number;
	adress: string;
	email: string;
	enabled: boolean;
	roles: string[];
	poste: string;
}
export enum Fonction {
    CHEF_DE_QUART = 'CHEF_DE_QUART',
    CHEF_DE_BLOC = 'CHEF_DE_BLOC',
	AGENT='AGENT'
  }
