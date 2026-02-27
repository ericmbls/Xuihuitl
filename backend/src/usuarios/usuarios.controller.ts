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
    
    return this.usuariosService.updatePreferences(Number(req.user.id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('preferences')
  async getPreferences(@Req() req) {
    return this.usuariosService.getPreferences(Number(req.user.id));
  }
}