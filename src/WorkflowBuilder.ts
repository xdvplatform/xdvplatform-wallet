const ethers = require('ethers');
const rlp = require('rlp');
import { IsPositive, Min, IsEthereumAddress, MinLength, MaxLength, validateOrReject, arrayMinSize, ArrayMinSize, ArrayMaxSize } from 'class-validator';


export enum OperationType {
  ADD_DOCUMENT = 0,
  UPDATE_DOCUMENT = 2
}
export enum FileContentType {
  USER_CONTENT = 'user_content',
  CERTIFICATION_CONTENT = 'certification_content',
  SIGNATURE_CONTENT = 'signature_content'
}
export enum FileOperationType {
  NONE = 0,
  UPDATED = 1
}
export class StepExecOptions{
  @IsEthereumAddress() 
  public to: string = '';
  @IsPositive()
   public step: number;
  @IsPositive()
   public actor: number;
  @IsEthereumAddress() 
   public from: string;
   public payload: string;
  @IsPositive()
   public documentId: number;
  @IsPositive()
   public extensionId: number;
}
export class WStep {
  @IsPositive()
  public currentActor: number = 0;

  @IsPositive()
  public current: number = 0;

  @IsPositive()
  public next: number = 0;

  @IsPositive()
  public forkId?: number = 0;

  @IsPositive()
  public mappingType: number = 0;

  public recipientValidations?: string[];
  public senderValidations?: string[];
  public stepValidations?: string[];
}
export class WTemplate{
  @ArrayMinSize(2)
  @ArrayMaxSize(40)
  public steps: WStep[];
  
  public transitions: Transition[];
}
export class RlpDocumentPayload<T> {
  public wfDocumentModelFn: () => T[];
  @ArrayMinSize(1)
  public files: FileContentRef[];
}
export type FileContentRef =
  [string, string, string];

export type ValidationPair = [any, any];

export type Transition =
  [number, number, number];

export class WorkflowBuilder {
  private actors: string[] = [];
  private states: string[] = [];
  private steps: Array<WStep> = [];

  constructor() {
  }

  public async toDocumentPayload<T>(entry: RlpDocumentPayload<T>): Promise<string> {
    await validateOrReject(entry);
    const payload = [entry.wfDocumentModelFn(), entry.files];
    return ethers.utils.arrayify(rlp.encode(payload));
  }


  private toStepInfo({ user, recipient, status }): any[] {
    /*
    * user: address, recipient: address, status: uint
    */
    let rlpContent = [];
    rlpContent = [
      user || '',
      recipient || '',
      status || '',
    ];
    return rlpContent;
  }

  public async toTemplate({ steps,transitions}: WTemplate): Promise<string> {
    // WStep[]
    //     [
    //      uint256,
    //      uint256,
    //      uint256,
    //      uint256,
    //      uint256,
    //      address[],
    //      address[],
    //      uint256[],
    // ]

    await validateOrReject({steps, transitions } as WTemplate);
    const rlpSteps = steps.map(step => {
      return [
        step.currentActor,
        step.current,
        step.next,
        step.forkId,
        step.mappingType,
        [...step.recipientValidations],
        [...step.senderValidations],
        [...step.stepValidations],
      ]
    });
    // LinkStep[]
    // [
    //  [uint256, uint256, uint256 ]
    // ]
    const rlpLinkStep = transitions.map(a => {
      return [...a];
    });

    // createWF payload
    // [[], []]
    const payload = [rlpSteps, rlpLinkStep];
    return ethers.utils.arrayify(rlp.encode(payload));
  }

  /**
   * Defines the states for a workflow
   * @param states array of string, which will be converted to bytes32.
   */
  public createStates(states: string[]): void {
    this.states = states.map((s) => {
      return ethers.utils.formatBytes32String(s);
    });
  }

  /**
   * Gets the state index
   * @param state string
   */
  public getState(state: string): number {
    return this.states.findIndex(
      (s) => ethers.utils.formatBytes32String(state) === s
    );
  }

  /**
   * Gets the states
   */
  public getStates(): string[] {
    return this.states;
  }


  /**
   * Gets the states
   */
  public getSteps(): WStep[] {
    return this.steps;
  }

  /**
   * Defines the actors or personas in a workflow
   * @param actors array of string
   */
  public createActors(actors) {
    this.actors = actors.map((a) => {
      return ethers.utils.formatBytes32String(a);
    });
  }

  /**
   * Gets the actor index1
   * @param actor string
   */
  public getActor(actor: string) {
    return this.actors.findIndex(
      (a) => ethers.utils.formatBytes32String(actor) === a
    );
  }

  /**
   * Gets the actors
   */
  public getActors(): string[] {
    return this.actors;
  }

  // { 'created'} or
  // ['created', 'recipient'] and
  /**
   * 
   * @param validations array or object containing the validations, use array for AND and object for OR
   */
  public createValidations(validations: Array<any> | object): ValidationPair[] {
    let items = [];

    if (Array.isArray(validations)) {
      items = validations.map((v) => {
        return [
          ethers.utils.formatBytes32String('and'),
          ethers.utils.formatBytes32String(v),
        ];
      });
    } else {
      items = Object.keys(validations).map((k) => {
        const value = validations[k];
        return [
          ethers.utils.formatBytes32String('or'),
          ethers.utils.formatBytes32String(k),
        ];
      });
    }

    return items;
  }

  // { actor: [action, ...]}
  // linkSteps(stepFlow) {
  //   let items;

  //   items = Object.keys(stepFlow).map((k) => {
  //     const value = stepFlow[k];
  //     return value.map((i) => {
  //       return this.getState(i);
  //     });
  //   });
  //   return items;
  // }

  // tightLinkSteps(flow) {
  //   return flow.map((i) => {
  //     return ethers.utils.defaultAbiCoder.encode(
  //       ['uint256', 'uint256', 'uint256'],
  //       [...i]
  //     );
  //   });
  // }

  public createStep(step: WStep): WorkflowBuilder {
    const {
      currentActor,
      current,
      next,
      forkId,
      mappingType,
      recipientValidations,
      senderValidations,
      stepValidations,
    } = step;
    const a = {
      currentActor,
      current,
      next,
      mappingType,
      forkId,
      stepValidations: stepValidations || [],
      senderValidations: senderValidations || [],
      recipientValidations: recipientValidations || [],
    };

    this.steps.push(a);
    return this;
  }

  public createPayload(obj) {
    const types = [];
    const values = [];
    const keys = Object.keys(obj);
    const arr = keys.map((k) => {
      if (typeof obj[k] === 'string') {
        types.push('string');
        values.push(obj[k]);
      }
      if (typeof obj[k] === 'number') {
        types.push('uint256');
        values.push(obj[k]);
      }
    });
    return ethers.utils.defaultAbiCoder.encode(types, values);
  }

  public async executeStep(template, options: StepExecOptions) {
    await validateOrReject(options);
    return template.executeStep(
      options.to,
      options.step,
      options.actor,
      options.documentId || 0,
      options.extensionId || 0,
      options.payload || [],
      {
        from: options.from,
      }
    );
  }
};
