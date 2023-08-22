import { V } from 'domain/entities/lsifData';

export class LsifDataDto {
  nodes: V[];

  constructor(vertices: V[]) {
    this.nodes = vertices.map((vertex) => {
      return vertex;
    });
  }
}
