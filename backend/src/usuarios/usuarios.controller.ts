import { Body, Controller, Patch, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsuariosService } from './usuarios.service';
import { UpdatePreferencesDto } from '../auth/dto/update-preferences.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('preferences')
  async updatePreferences(@Req() req, @Body() dto: UpdatePreferencesDto) {
    return this.usuariosService.updatePreferences(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('preferences')
  async getPreferences(@Req() req) {
    // Devolver TODAS las preferencias, no solo darkMode
    return this.usuariosService.getPreferences(req.user.id);
  }
}