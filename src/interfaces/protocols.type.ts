export enum ProtocolEnum {
  // Se deberá priorizar el punto más cercano en el que haya enemigos.
  CLOSEST_ENEMIES = 'closest-enemies',
  // Se deberá priorizar el punto más lejano en el que haya enemigos.
  FURTHEST_ENEMIES = 'furthest-enemies',
  // Deberan de priorizarse los puntos en los que exista algún aliado.
  ASSIST_ALLIES = 'assist-allies',
  // No debe de atacarse ningún punto en el que haya algún aliado.
  AVOID_CROOSFIRE = 'avoid-crossfire',
  // Debe de atacarse un mech si se encuentra.
  // En caso negativo, cualquier otro tipo de objetivo será válido.
  PRIORITIZE_MECH = 'prioritize-mech',
  // No debe de atacarse ningún enemigo del tipo mech
  AVOID_MECH = 'avoid-mech',
}

export const PROTOCOL_EXECUTION_PATTERN = [
  ProtocolEnum.ASSIST_ALLIES,
  ProtocolEnum.AVOID_CROOSFIRE,
  ProtocolEnum.AVOID_MECH,
  ProtocolEnum.PRIORITIZE_MECH,
  ProtocolEnum.CLOSEST_ENEMIES,
  ProtocolEnum.FURTHEST_ENEMIES,
];

export type Protocol = Array<string>;
