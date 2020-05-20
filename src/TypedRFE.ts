import { DGen, Item, Totales } from './models';
import { MinLength, IsDefined, Matches, ValidateNested, IsNumber, ArrayMaxSize } from 'class-validator';
export class TypedRFE {
  @IsNumber()
  public dVerForm: number;
  @Matches(/[F][E](([A|V|T|E|P|N|I]|[-]|[a-zA-Z0-9]){64})?/)
  @MinLength(64)
  public dId: string;
  @IsDefined()
  @ValidateNested()
  public gDGen: DGen;
    /**
   *               C01: Grupo de datos que especifica cada ítem del detalle de la transacción
   */
  @IsDefined()
  @ArrayMaxSize(1000)
  @ValidateNested()
  public gItem: Item[];


  /**
   *               C01: Grupo de datos que especifica cada ítem del detalle de la transacción
   */
  @IsDefined()
  @ValidateNested()
  public gTot: Totales;
}
