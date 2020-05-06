"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers = require('ethers');
const rlp = require('rlp');
const class_validator_1 = require("class-validator");
var OperationType;
(function (OperationType) {
    OperationType[OperationType["ADD_DOCUMENT"] = 0] = "ADD_DOCUMENT";
    OperationType[OperationType["UPDATE_DOCUMENT"] = 2] = "UPDATE_DOCUMENT";
})(OperationType = exports.OperationType || (exports.OperationType = {}));
var FileContentType;
(function (FileContentType) {
    FileContentType["USER_CONTENT"] = "user_content";
    FileContentType["CERTIFICATION_CONTENT"] = "certification_content";
    FileContentType["SIGNATURE_CONTENT"] = "signature_content";
})(FileContentType = exports.FileContentType || (exports.FileContentType = {}));
var FileOperationType;
(function (FileOperationType) {
    FileOperationType[FileOperationType["NONE"] = 0] = "NONE";
    FileOperationType[FileOperationType["UPDATED"] = 1] = "UPDATED";
})(FileOperationType = exports.FileOperationType || (exports.FileOperationType = {}));
class StepExecOptions {
    constructor() {
        this.to = '';
    }
}
__decorate([
    class_validator_1.IsEthereumAddress()
], StepExecOptions.prototype, "to", void 0);
__decorate([
    class_validator_1.IsPositive()
], StepExecOptions.prototype, "step", void 0);
__decorate([
    class_validator_1.IsPositive()
], StepExecOptions.prototype, "actor", void 0);
__decorate([
    class_validator_1.IsEthereumAddress()
], StepExecOptions.prototype, "from", void 0);
__decorate([
    class_validator_1.IsPositive()
], StepExecOptions.prototype, "documentId", void 0);
__decorate([
    class_validator_1.IsPositive()
], StepExecOptions.prototype, "extensionId", void 0);
exports.StepExecOptions = StepExecOptions;
class WStep {
    constructor() {
        this.currentActor = 0;
        this.current = 0;
        this.next = 0;
        this.forkId = 0;
        this.mappingType = 0;
    }
}
__decorate([
    class_validator_1.IsPositive()
], WStep.prototype, "currentActor", void 0);
__decorate([
    class_validator_1.IsPositive()
], WStep.prototype, "current", void 0);
__decorate([
    class_validator_1.IsPositive()
], WStep.prototype, "next", void 0);
__decorate([
    class_validator_1.IsPositive()
], WStep.prototype, "forkId", void 0);
__decorate([
    class_validator_1.IsPositive()
], WStep.prototype, "mappingType", void 0);
exports.WStep = WStep;
class WTemplate {
}
__decorate([
    class_validator_1.ArrayMinSize(2),
    class_validator_1.ArrayMaxSize(40)
], WTemplate.prototype, "steps", void 0);
exports.WTemplate = WTemplate;
class RlpDocumentPayload {
}
__decorate([
    class_validator_1.ArrayMinSize(1)
], RlpDocumentPayload.prototype, "files", void 0);
exports.RlpDocumentPayload = RlpDocumentPayload;
class WorkflowBuilder {
    constructor() {
        this.actors = [];
        this.states = [];
        this.steps = [];
    }
    toDocumentPayload(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            yield class_validator_1.validateOrReject(entry);
            const payload = [entry.wfDocumentModelFn(), entry.files];
            return ethers.utils.arrayify(rlp.encode(payload));
        });
    }
    toStepInfo({ user, recipient, status }) {
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
    toTemplate({ steps, transitions }) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield class_validator_1.validateOrReject({ steps, transitions });
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
                ];
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
        });
    }
    /**
     * Defines the states for a workflow
     * @param states array of string, which will be converted to bytes32.
     */
    createStates(states) {
        this.states = states.map((s) => {
            return ethers.utils.formatBytes32String(s);
        });
    }
    /**
     * Gets the state index
     * @param state string
     */
    getState(state) {
        return this.states.findIndex((s) => ethers.utils.formatBytes32String(state) === s);
    }
    /**
     * Gets the states
     */
    getStates() {
        return this.states;
    }
    /**
     * Gets the states
     */
    getSteps() {
        return this.steps;
    }
    /**
     * Defines the actors or personas in a workflow
     * @param actors array of string
     */
    createActors(actors) {
        this.actors = actors.map((a) => {
            return ethers.utils.formatBytes32String(a);
        });
    }
    /**
     * Gets the actor index1
     * @param actor string
     */
    getActor(actor) {
        return this.actors.findIndex((a) => ethers.utils.formatBytes32String(actor) === a);
    }
    /**
     * Gets the actors
     */
    getActors() {
        return this.actors;
    }
    // { 'created'} or
    // ['created', 'recipient'] and
    /**
     *
     * @param validations array or object containing the validations, use array for AND and object for OR
     */
    createValidations(validations) {
        let items = [];
        if (Array.isArray(validations)) {
            items = validations.map((v) => {
                return [
                    ethers.utils.formatBytes32String('and'),
                    ethers.utils.formatBytes32String(v),
                ];
            });
        }
        else {
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
    createStep(step) {
        const { currentActor, current, next, forkId, mappingType, recipientValidations, senderValidations, stepValidations, } = step;
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
    createPayload(obj) {
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
    executeStep(template, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield class_validator_1.validateOrReject(options);
            return template.executeStep(options.to, options.step, options.actor, options.documentId || 0, options.extensionId || 0, options.payload || [], {
                from: options.from,
            });
        });
    }
}
exports.WorkflowBuilder = WorkflowBuilder;
;
//# sourceMappingURL=WorkflowBuilder.js.map