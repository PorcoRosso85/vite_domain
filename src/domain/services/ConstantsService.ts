import { ConstantsProvider } from 'domain/interfaces/ConstantsProvider';
import { SystemSettings } from 'domain/constants/BasicSettings';

// TODO: SystemSettingsを各フェーズセッティング値に変える
export class ConstantsService implements ConstantsProvider {
  private settings = SystemSettings;

  getConstants(key: string): number | string | undefined {
    return this.settings[key as keyof typeof this.settings];
  }
}
