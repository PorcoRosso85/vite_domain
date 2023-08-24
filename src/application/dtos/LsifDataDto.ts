import { V } from 'domain/entities/LsifDataEntities';

export class LsifDataDto {
  nodes: V[];

  constructor(vertices: V[]) {
    this.nodes = vertices.map((vertex) => {
      return vertex;
    });
  }
}
