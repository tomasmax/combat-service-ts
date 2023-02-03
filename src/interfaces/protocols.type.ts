export enum ProtocolEnum {
  // Prioritize closest enemy target
  CLOSEST_ENEMIES = 'closest-enemies',
  // Prioritize furthest enemy target
  FURTHEST_ENEMIES = 'furthest-enemies',
  // Prioritize allies targets
  ASSIST_ALLIES = 'assist-allies',
  // Don't attack any target with allies
  AVOID_CROOSFIRE = 'avoid-crossfire',
  // Attack a mech target
  // Otherwise attack another target
  PRIORITIZE_MECH = 'prioritize-mech',
  // Don't attack mech targets
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
