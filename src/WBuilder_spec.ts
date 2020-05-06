import { WorkflowBuilder, RlpDocumentPayload, WTemplate, OperationType, FileContentType } from './WorkflowBuilder';
import { expect } from 'chai';



export type Persona = [string, string, string, string];

export class RecetaDocument {
  constructor(public description: string,
    public patient: Persona,
    public doctor: Persona,
    public pharmacy: Persona,
    public amount: number,
    public tax: number, ) { }

}

describe("WTemplate", function () {
  const recetaFn = (receta: RecetaDocument) => {
    let rlpContent = [];
    rlpContent = [
      receta.description,
      [...receta.doctor],
      [...receta.patient],
      [...receta.pharmacy],
      receta.amount,
      receta.tax
    ];
    return rlpContent;
  }

  beforeEach(function () {
  });

  it("should be able to validate before creating a document payload", async function () {
    const payload = new RlpDocumentPayload<RecetaDocument>();
    payload.wfDocumentModelFn = () => recetaFn({
      description: 'Acetaminofen 100 mg por 7 dias cada 8 horas',
      patient: ['John Lopez', '', '', '0xeeC58E89996496640c8b5898A7e0218E9b6E90cB'],
      doctor: ['Donovan Rodriguez', '', '', '0xeeC58E89996496640c8b5898A7e0218E9b6E90cB'],
      pharmacy: ['n', '', '', '0xeeC58E89996496640c8b5898A7e0218E9b6E90cB'],
      amount: 0,
      tax: 0
    });
    payload.files = [
      [FileContentType.USER_CONTENT, 'factura.pdf', '/ipfs/101010101']

    ];

    const builder = new WorkflowBuilder();

    const res = await builder.toDocumentPayload<RecetaDocument>(payload);

    expect(res.length).equal(195);
  });


  it("should be able to validate before creating a workflow payload", async function () {
    const payload = new RlpDocumentPayload<RecetaDocument>();
    payload.wfDocumentModelFn = () => recetaFn({
      description: 'Acetaminofen 100 mg por 7 dias cada 8 horas',
      patient: ['John Lopez', '', '', '0xeeC58E89996496640c8b5898A7e0218E9b6E90cB'],
      doctor: ['Donovan Rodriguez', '', '', '0xeeC58E89996496640c8b5898A7e0218E9b6E90cB'],
      pharmacy: ['n', '', '', '0xeeC58E89996496640c8b5898A7e0218E9b6E90cB'],
      amount: 0,
      tax: 0
    });
    payload.files = [
      [FileContentType.USER_CONTENT, 'factura.pdf', '/ipfs/101010101']
    ];

    const builder = new WorkflowBuilder();
    builder.createActors(['DR', 'PATIENT', 'RX']);
    builder.createStates([
      'NONE',
      'PRESCRIPTION_SENT',
      'RX_REQUEST',
      'RX_ACCEPT',
      'RX_REJECT',
      'PATIENT_PAYMENT_SENT',
      'PAYMENT_RCV',
      'COMPLETED'
    ]);
    builder
      .createStep({
        currentActor: builder.getActor('DR'),
        current: builder.getState('NONE'), // none
        next: builder.getState('PRESCRIPTION_SENT'), // created
        mappingType: OperationType.ADD_DOCUMENT,
      })
      .createStep({
        currentActor: builder.getActor('PATIENT'),
        current: builder.getState('PRESCRIPTION_SENT'), // created
        next: builder.getState('RX_REQUEST'), // accepted
        mappingType: OperationType.UPDATE_DOCUMENT,
        stepValidations: [builder.getState('PRESCRIPTION_SENT')],
      })
      .createStep({
        currentActor: builder.getActor('RX'),
        current: builder.getState('RX_REQUEST'),
        next: builder.getState('RX_ACCEPT'),
        mappingType: OperationType.UPDATE_DOCUMENT,
        forkId: builder.getState('RX_REJECT'),
        stepValidations: [builder.getState('RX_REQUEST')],
        // recipientValidations: [accounts[2]],
      })
      .createStep({
        currentActor: builder.getActor('RX'),
        current: builder.getState('RX_REQUEST'),
        next: builder.getState('RX_REJECT'),
        mappingType: OperationType.UPDATE_DOCUMENT,
        // forkId: builder.getState('MULTI_SIGNERS'),
        stepValidations: [builder.getState('RX_REQUEST')],
        // recipientValidations: [...accounts],
      })
      .createStep({
        currentActor: builder.getActor('PATIENT'),
        current: builder.getState('RX_ACCEPT'),
        next: builder.getState('PATIENT_PAYMENT_SENT'),
        mappingType: OperationType.UPDATE_DOCUMENT,
        // forkId: builder.getState('MULTI_SIGNERS'),
        stepValidations: [builder.getState('RX_ACCEPT')],
        // recipientValidations: [...accounts],
      })
      .createStep({
        currentActor: builder.getActor('RX'),
        current: builder.getState('PATIENT_PAYMENT_SENT'),
        next: builder.getState('PAYMENT_RCV'),
        mappingType: OperationType.UPDATE_DOCUMENT,
        // forkId: builder.getState('MULTI_SIGNERS'),
        stepValidations: [builder.getState('PATIENT_PAYMENT_SENT')],
        // recipientValidations: [...accounts],
      })
      .createStep({
        currentActor: builder.getActor('PATIENT'),
        current: builder.getState('PAYMENT_RCV'),
        next: builder.getState('COMPLETED'),
        mappingType: OperationType.UPDATE_DOCUMENT,
        // forkId: builder.getState('MULTI_SIGNERS'),
        stepValidations: [builder.getState('PAYMENT_RCV')],
        // recipientValidations: [...accounts],
      });

    const template = new WTemplate();
    template.steps = builder.getSteps();
    template.transitions = [
      [builder.getActor('DR'),
      builder.getState('NONE'),
      builder.getState('PRESCRIPTION_SENT')],
      [
        builder.getActor('PATIENT'),
        builder.getState('PRESCRIPTION_SENT'),
        builder.getState('RX_REQUEST'),
      ],
      [
        builder.getActor('RX'),
        builder.getState('RX_REQUEST'),
        builder.getState('RX_ACCEPT'),
      ],
      [
        builder.getActor('RX'),
        builder.getState('RX_REQUEST'),
        builder.getState('RX_REJECT'),
      ],
      [
        builder.getActor('PATIENT'),
        builder.getState('RX_ACCEPT'),
        builder.getState('PATIENT_PAYMENT_SENT'),
      ],
      [
        builder.getActor('RX'),
        builder.getState('PATIENT_PAYMENT_SENT'),
        builder.getState('PAYMENT_RCV'),
      ],
      [
        builder.getActor('PATIENT'),
        builder.getState('PAYMENT_RCV'),
        builder.getState('COMPLETED'),
      ],
    ];

    const res = await builder.toTemplate(template);

    expect(res.length).equal(102);
  });


  xit("should be able to validate before executing step", function () {
  });


  // describe("when song has been paused", function() {
  //   beforeEach(function() {
  //     player.play(song);
  //     player.pause();
  //   });

  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();

  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });

  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });

  // // demonstrates use of spies to intercept and test method calls
  // it("tells the current song if the user has made it a favorite", function() {
  //   spyOn(song, 'persistFavoriteStatus');

  //   player.play(song);
  //   player.makeFavorite();

  //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // });

  // //demonstrates use of expected exceptions
  // describe("#resume", function() {
  //   it("should throw an exception if song is already playing", function() {
  //     player.play(song);

  //     expect(function() {
  //       player.resume();
  //     }).toThrowError("song is already playing");
  //   });
  // });
});
