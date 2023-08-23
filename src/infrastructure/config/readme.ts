import { EnvConfigProvider } from "infrastructure/config/EnvConfigProvider"

src/
domain/
configurations/
IConfiguration.ts （設定値に関するビジネスルールを表すインターフェース）
application/
ConfigurationService.ts （設定値をアプリケーション層でどう扱うかのロジック）
infrastructure/
EnvironmentConfigProvider.ts （環境変数を読み込む具体的な処理）
StaticConfigProvider.ts （静的設定を読み込む具体的な処理）
DynamicConfigProvider.ts （動的設定を読み込む具体的な処理）


./src/application/
./src/application/dtos/
./src/application/dtos/lsifDataDto.ts
./src/application/dtos/userDto.ts
./src/application/services/
./src/application/services/authService.ts
./src/application/services/designSupportService.ts
./src/application/services/initializeGraphData.ts
./src/application/services/initializeLsifData.ts
./src/application/services/lsifService.ts
./src/application/services/ConfigurationService.ts （設定値をアプリケーション層でどう扱うかのロジック）
./src/domain/
./src/domain/aggregates/
./src/domain/constants/
./src/domain/constants/AppSettings.ts
./src/domain/constants/BasicSettings.ts
./src/domain/constants/ExternalServiceSettings.ts
./src/domain/constants/UiUxSettings.ts
./src/domain/constants/UserAuthSettings.ts
./src/domain/constants/constants.ts
./src/domain/entities/
./src/domain/entities/graphData.ts
./src/domain/entities/inheritance_relationships.json
./src/domain/entities/lsifData.ts
./src/domain/errors/
./src/domain/errors/additionalErrorInfo.ts
./src/domain/errors/baseErrors.ts
./src/domain/errors/errorStatus.ts
./src/domain/errors/specifiedErrors.ts
./src/domain/events/
./src/domain/factories/
./src/domain/interfaces/
./src/domain/interfaces/
./src/domain/interfaces/
./src/domain/interfaces/
./src/domain/interfaces/
./src/domain/interfaces/
./src/domain/interfaces/ConfigProvider.ts (EnvConfigProviderとCloudConfigProviderの出力型)
./src/domain/interfaces/EnvironmentState.ts （設定値に関するビジネスルールを表すインターフェース, アプリはこの型に依存して定数や環境変数を取得する）
./src/domain/repositories/
./src/domain/repositories/lsifDataRepository.ts
./src/domain/services/
./src/domain/validation/
./src/domain/valueObjects/
./src/infrastructure/
./src/infrastructure/authentication/
./src/infrastructure/communication/
./src/infrastructure/communication/README.md
./src/infrastructure/communication/express.cjs
./src/infrastructure/communication/expressServer.ts
./src/infrastructure/communication/messageDetermination.ts
./src/infrastructure/config/
./src/infrastructure/config/CloudConfigProvider.ts （Cloudから環境変数を読み込む具体的な処理）
./src/infrastructure/config/CreateConfigProvider.ts 
./src/infrastructure/config/EnvConfigProvider.ts （OSや.envから環境変数を読み込む具体的な処理）
./src/infrastructure/config/EnvironmentStatus.ts （静的設定を読み込む具体的な処理=オブジェクトリテラルを格納）
./src/infrastructure/config/EnvironmentStatus.ts （動的設定を読み込む具体的な処理）
./src/infrastructure/config/IsPrd.ts 
./src/infrastructure/config/__tests__/
./src/infrastructure/config/isValidEnvPhase.ts
./src/infrastructure/config/readme.ts
./src/infrastructure/database/
./src/infrastructure/database/README.md
./src/infrastructure/database/dao/
./src/infrastructure/database/databaseConnection.ts
./src/infrastructure/database/databaseModels.ts
./src/infrastructure/database/potentialNoSQLAdapter.ts
./src/infrastructure/repositories/
./src/infrastructure/repositories/README.md
./src/infrastructure/repositories/implementations/
./src/infrastructure/repositories/lsifDataRepository.ts
./src/infrastructure/security/
./src/infrastructure/security/README.md
./src/infrastructure/utils/
./src/infrastructure/utils/README.md