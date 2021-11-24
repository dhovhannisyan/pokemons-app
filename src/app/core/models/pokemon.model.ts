export interface Pokemon {
  id: number;
  name: string;
  weight?: number;
  height?: number;
  base_experience?: number;
  order?: number;
  stats?: string[];
  types?: string[];
  shiny_img?: string[];
  default_img?: string[];
}
